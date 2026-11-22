"""YIU S04: chronological forecasting, uncertainty, and mini-brain baseline. Standard library only. Synthetic fixtures."""
import argparse,csv,hashlib,json,math,random,statistics,subprocess,sys,tempfile
from pathlib import Path

def digest(x): return hashlib.sha256(json.dumps(x,sort_keys=True,separators=(',',':')).encode()).hexdigest()

def series(seed,n=160):
    rng=random.Random(seed); phase=rng.uniform(0,6.28); trend=rng.uniform(-0.03,0.03)
    vals=[]
    for t in range(n):
        seasonal=8*math.sin(2*math.pi*t/24+phase)
        noise=rng.gauss(0,2.0)
        vals.append(50+trend*t+seasonal+noise)
    shift1=rng.uniform(8,14); shift2=rng.uniform(-14,-8)
    vals=[v+shift1 if i>=120 else v for i,v in enumerate(vals)]
    vals=[v+shift2 if i>=145 else v for i,v in enumerate(vals)]
    return vals

def persistence(train): return train[-1]
def linear(train):
    n=len(train); xs=list(range(n)); mx=sum(xs)/n; my=sum(train)/n
    b=sum((x-mx)*(y-my) for x,y in zip(xs,train))/sum((x-mx)**2 for x in xs)
    return my+b*(n-mx)
def ewma(train,alpha=0.3):
    s=train[0]
    for x in train[1:]: s=alpha*x+(1-alpha)*s
    return s
def cusum(train,threshold=4.0):
    mean=sum(train)/len(train); s=0.0; alarms=0
    for x in train:
        s=max(0.0,s+abs(x-mean)-0.5)
        if s>threshold: alarms+=1; s=0.0
    return alarms
def mini(train,window=12):
    # Simple temporal-memory readout: weighted recent-window slope, not a claim of biological memory.
    w=train[-window:]; n=len(w); xs=list(range(n)); mx=sum(xs)/n; my=sum(w)/n
    b=sum((x-mx)*(y-my) for x,y in zip(xs,w))/sum((x-mx)**2 for x in xs)
    return w[-1]+b

def forecast(train,method):
    if method=='persistence': return persistence(train)
    if method=='linear': return linear(train)
    if method=='ewma': return ewma(train)
    if method=='mini_brain': return mini(train)
    raise ValueError(method)

def evaluate(case,method):
    vals=case['series']; horizon=case['horizon']; train=vals[:case['train_end']]
    preds=[]; actuals=[]
    for h in range(horizon):
        p=forecast(train,method); actual=vals[case['train_end']+h]
        preds.append(p); actuals.append(actual); train=train+[actual]  # rolling-origin update
    errors=[p-a for p,a in zip(preds,actuals)]
    mae=sum(abs(e) for e in errors)/len(errors); rmse=math.sqrt(sum(e*e for e in errors)/len(errors))
    residual_sd=statistics.pstdev(errors) if len(errors)>1 else 0.0
    covered=sum(1 for e in errors if abs(e)<=1.2816*residual_sd+1e-9)
    alarms=cusum(actuals)
    return {'method':method,'mae':mae,'rmse':rmse,'coverage':covered/len(errors),'alarms':alarms,'errors':errors}

def worker(case_file,result_file):
    c=json.loads(Path(case_file).read_text()); r=evaluate(c,c['method'])
    Path(result_file).write_text(json.dumps(r))

def run(out):
    out=Path(out); out.mkdir(parents=True,exist_ok=True); rows=[]
    for seed in range(8401,8411):
        vals=series(seed); case={'seed':seed,'series':vals,'train_end':120,'horizon':40}
        results={}
        for method in ['persistence','linear','ewma','mini_brain']:
            with tempfile.TemporaryDirectory() as td:
                d=Path(td); cp=d/'case.json'; rp=d/'result.json'; case['method']=method; cp.write_text(json.dumps(case))
                proc=subprocess.run([sys.executable,str(Path(__file__).resolve()),'--worker',str(cp),str(rp)],capture_output=True,text=True,timeout=10)
                if proc.returncode: raise RuntimeError(proc.stderr)
                results[method]=json.loads(rp.read_text())
        base=results['persistence']['mae']
        for method,r in results.items():
            rows.append({'seed':seed,'method':method,'horizon':40,'train_end':120,'mae':r['mae'],'rmse':r['rmse'],
                         'mae_vs_persistence':r['mae']-base,'improvement_pct':100*(base-r['mae'])/base,
                         'coverage':r['coverage'],'alarms':r['alarms'],'beats_persistence':int(r['mae']<base)})
    fields=list(rows[0])
    with (out/'02_RESULTS.csv').open('w',newline='') as f:
        w=csv.DictWriter(f,fieldnames=fields); w.writeheader(); w.writerows(rows)
    groups=[]
    for method in ['persistence','linear','ewma','mini_brain']:
        a=[r for r in rows if r['method']==method]
        groups.append({'method':method,'runs':len(a),'mean_mae':sum(r['mae'] for r in a)/len(a),
                       'mean_improvement_pct':sum(r['improvement_pct'] for r in a)/len(a),'wins_vs_persistence':sum(r['beats_persistence'] for r in a),
                       'mean_coverage':sum(r['coverage'] for r in a)/len(a),'mean_alarms':sum(r['alarms'] for r in a)/len(a)})
    assert len(rows)==40
    assert all(0<=r['coverage']<=1 for r in rows)
    checkpoint={'brain_name':'YIU','simulation':'S04 Prediction Rift and Uncertainty','status':'executed_synthetic_benchmark',
                'runs':40,'groups':groups,'next_simulation':'S05 Rule Forge and Safety Constraints',
                'next_action':'Build symbolic rule tests that constrain unsafe neural outputs; no live deployment.',
                'limitations':['No language model evaluated','No real TOLBIT time series ingested','No competitor system evaluated','No subjective-consciousness inference','Synthetic series do not establish real-world forecasting validity','No probabilistic model, conformal interval, or full calibration curve','Mini-brain baseline is a weighted recent-window slope, not evidence of biological memory'],
                'sources':{'fixture':'Synthetic seasonal series generated by this script; not imported TOLBIT experimental data'}}
    (out/'04_CHECKPOINT.json').write_text(json.dumps(checkpoint,indent=2))
    lines=['# YIU — Simulation 04: Prediction Rift','',
           'Executed synthetic chronological forecasting benchmark. YIU is the exact project name; no acronym is assigned.',
           '', '## Question','Can YIU’s temporal-memory readout improve one-step-ahead forecasting over persistence, linear trend, and EWMA baselines on held-out rolling-origin data?',
           '', '## Design','10 seeds x 4 forecasting methods = 40 trials. Each series has 160 points: 120 training points and 40 rolling-origin test points. The series includes trend, 24-step seasonality, Gaussian noise, and two abrupt shifts after the training boundary.',
           '', '## Methods','Persistence repeats the latest observation. Linear trend fits a global slope. EWMA uses alpha 0.3. The mini-brain baseline uses a weighted recent-window slope over the last 12 points; it is a simple temporal readout, not evidence of biological memory.',
           '', '| Method | Mean MAE | Mean improvement vs persistence | Wins | Mean 80% coverage | Mean alarms |','|---|---:|---:|---:|---:|---:|']
    for g in groups: lines.append(f"| {g['method']} | {g['mean_mae']:.3f} | {g['mean_improvement_pct']:.1f}% | {g['wins_vs_persistence']}/10 | {g['mean_coverage']:.3f} | {g['mean_alarms']:.1f} |")
    lines+=['','## Interpretation','This benchmark reports per-seed wins and uncertainty rather than claiming a universal winner. A method with a lower mean MAE may still lose on individual seeds. Coverage is a rough interval diagnostic based on residual spread, not a full probabilistic calibration curve.',
            '', '## TOLBIT connection','This simulation tests the forecasting machinery needed before YIU can evaluate mini-brain claims on real TOLBIT time series. Original TOLBIT files were not loaded. No claim about the mini-brain, consciousness, or outage prediction is validated by this run.',
            '', '## Limits and next failures','Synthetic seasonality and abrupt shifts do not establish real-world validity. This implementation does not test hyperparameter tuning leakage, changing seasonal periods, missing data, multivariate drivers, probabilistic forecasts, conformal calibration, or deployment drift. EWMA/CUSUM are conventional baselines; statsmodels documents exponential smoothing and forecast methods, but this run uses a standard-library implementation for reproducibility.',
            '', '## Run locally','Python 3.10+ standard library only. From this folder: `python 01_RUN_SIMULATION.py --out rerun_results`. Rerun output is separate from bundled results.',
            '', '## Next stage','S05: symbolic rules and safety constraints. Compare systems only on identical tasks and budgets before making competitor claims.',
            '', '## References','statsmodels exponential smoothing: https://www.statsmodels.org/devel/generated/statsmodels.tsa.holtwinters.ExponentialSmoothing.html . NIST AI RMF Measure function: https://airc.nist.gov/airmf-resources/playbook/measure/ . These sources inform evaluation design; they do not validate YIU.']
    (out/'03_REPORT.md').write_text('\n'.join(lines))
    manifest={'script_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'python':sys.version,'seeds':list(range(8401,8411)),
              'schema_version':1,'files':{p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in out.iterdir() if p.is_file() and p.name!='05_MANIFEST.json'}}
    (out/'05_MANIFEST.json').write_text(json.dumps(manifest,indent=2))
    print(json.dumps(groups))

if __name__=='__main__':
    if len(sys.argv)>1 and sys.argv[1]=='--worker': worker(sys.argv[2],sys.argv[3])
    else:
        parser=argparse.ArgumentParser(); parser.add_argument('--out',default='rerun_results'); args=parser.parse_args(); run(args.out)
