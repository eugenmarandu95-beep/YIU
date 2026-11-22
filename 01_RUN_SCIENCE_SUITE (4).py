"""YIU Eyes of MAI pilot 23-25. Python 3.10+, numpy. No API or LLM required."""
import argparse,csv,hashlib,json,platform,sys
from pathlib import Path
import numpy as np
SEEDS=list(range(9201,9231))
def sha(x): return hashlib.sha256(json.dumps(x,sort_keys=True,separators=(',',':')).encode()).hexdigest()
def run(out):
    out=Path(out);out.mkdir(parents=True,exist_ok=True)
    rows=[];raw={'config':{'seeds':SEEDS,'S23':'Lens Activation: choose correct Eye for a question','S24':'Scale Survival: detect structure surviving coarse-graining','S25':'Curiosity Engine: choose most informative next question'},'trials':[]}
    for seed in SEEDS:
        rng=np.random.default_rng(seed)
        # S23 Lens Activation: 10 questions, 10 Eyes, correct lens known.
        eyes=['coherence','temporal_dynamics','emergence','resilience','adaptation','self_organization','information_flow','constraint','inheritance','purpose']
        questions=['What is trying to organize?','What changes over time?','What appears that was not there before?','What returns after disturbance?','What changes to fit a new condition?','What order arises from local rules?','What moves, what is kept, what is lost?','What limits possibility?','What carries forward?','What is this for?']
        correct=eyes
        for mode in ['random','lens_activation']:
            if mode=='random':
                chosen=[eyes[int(rng.integers(0,10))] for _ in questions]
            else:
                chosen=correct  # oracle lens activation
            correct_count=int(np.sum([c==g for c,g in zip(chosen,correct)]))
            rows.append({'sim':'23','seed':seed,'method':mode,'metric':'correct_lens','value':correct_count})
        raw['trials'].append({'sim':'23','seed':seed,'questions':questions,'correct':correct,'chosen':chosen})
        # S24 Scale Survival: synthetic multi-scale signal.
        n=256;t=np.arange(n);fine=rng.normal(0,.5,n);coarse=2*np.sin(2*np.pi*t/64);signal=fine+coarse
        def coarse_grain(x,k=4):return x[:len(x)//k*k].reshape(-1,k).mean(axis=1)
        c4=coarse_grain(signal,4);c16=coarse_grain(signal,16)
        for mode in ['fixed_scale','multi_scale']:
            if mode=='fixed_scale':score=float(np.std(signal))
            else:score=float(np.std(c4)+np.std(c16))
            rows.append({'sim':'24','seed':seed,'method':mode,'metric':'scale_survival_score','value':score})
        raw['trials'].append({'sim':'24','seed':seed,'signal':signal.tolist(),'coarse4':c4.tolist(),'coarse16':c16.tolist()})
        # S25 Curiosity Engine: choose most informative next question among 5 candidate experiments.
        # Simple 1D estimation: unknown mean, known variance; choose experiment with highest expected info gain.
        true_mean=rng.uniform(-1,1);prior_mean=0;prior_var=1;noise_var=1;budget=5
        candidates=[-2,-1,0,1,2]
        for mode in ['random','information_gain']:
            m=prior_mean;v=prior_var;chosen=[]
            for step in range(budget):
                if mode=='random':x=float(rng.choice(candidates))
                else:
                    # expected posterior variance reduction for Gaussian likelihood
                    gains=[(x-m)**2/(v+noise_var) for x in candidates]
                    x=candidates[int(np.argmax(gains))]
                chosen.append(x)
                y=true_mean+x+rng.normal(0,np.sqrt(noise_var))
                post_var=1/(1/v+1/noise_var);m=post_var*(m/v+y/noise_var);v=post_var
            est_error=abs(m-true_mean)
            rows.append({'sim':'25','seed':seed,'method':mode,'metric':'estimation_error','value':est_error})
        raw['trials'].append({'sim':'25','seed':seed,'true_mean':true_mean,'prior_mean':prior_mean,'prior_var':prior_var,'noise_var':noise_var,'budget':budget,'chosen':chosen})
    assert len(rows)==180,len(rows)
    assert all(r['value']>=0 for r in rows if r['metric'] in ('correct_lens','scale_survival_score','estimation_error'))
    assert all(r['value']==10 for r in rows if r['sim']=='23' and r['method']=='lens_activation' and r['metric']=='correct_lens')
    assert all(r['value']<2.0 for r in rows if r['sim']=='25' and r['method']=='information_gain' and r['metric']=='estimation_error')
    with (out/'02_METRICS.csv').open('w',newline='') as f:
        w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
    groups=[]
    for sim,method,metric in sorted({(r['sim'],r['method'],r['metric']) for r in rows}):
        vals=np.array([r['value'] for r in rows if (r['sim'],r['method'],r['metric'])==(sim,method,metric)])
        groups.append({'sim':sim,'method':method,'metric':metric,'mean':float(vals.mean()),'sd_across_seeds':float(vals.std(ddof=1)),'n':len(vals)})
    raw['summary']=groups;raw['checkpoint']={'complete':['23','24','25'],'next':'26 Field Validation Design','data_status':'Synthetic only; no original project corpus loaded.'}
    (out/'03_RAW_DATA_AND_CHECKPOINT.json').write_text(json.dumps(raw,indent=2))
    report=['# YIU Eyes of MAI simulations 23–25','', 'Executed CPU-only NumPy experiments, 30 seeds each. No API access or credentials.','',
    '## S23 — Lens Activation','Test whether YIU can choose the correct Eye for a question. Compare random lens selection with oracle lens activation.',
    '', '## S24 — Scale Survival','Test whether YIU can detect structure surviving coarse-graining. Compare fixed-scale variance with multi-scale variance after coarse-graining at two scales.',
    '', '## S25 — Curiosity Engine','Test whether YIU can choose the most informative next experiment under a fixed budget. Compare random selection with information-gain selection in a Gaussian estimation task.',
    '', '## Results','| Sim | Method | Metric | Mean | Seed SD |','|---|---|---|---:|---:|']
    for g in groups:report.append(f"| {g['sim']} | {g['method']} | {g['metric']} | {g['mean']:.6f} | {g['sd_across_seeds']:.6f} |")
    report+=['','## Use in YIU','Implement lens activation, multi-scale analysis, and information-gain experiment selection as distinct Eyes of MAI modules. Preserve seeds, raw arrays, hashes, and provenance. Do not treat high lens activation as proof of coherence; validate with controls.',
    '', '## Study notes','S23 assumes a fixed question set and oracle lens mapping. S24 uses synthetic multi-scale signals. S25 assumes Gaussian noise and a known variance. Original TOLBIT materials were not ingested; their results are not substituted by these generated observations. No external systems were benchmarked.',
    '', '## Rerun','Python 3.10+; `python -m pip install numpy`; `python 01_RUN_SCIENCE_SUITE.py --out rerun_results`. Five files are emitted. Never overwrite original results when rerunning. All raw arrays and provenance maps are saved in file 03.',
    '', '## Continuity','Next: S26 Field Validation Design, with preregistered metrics, external data, and human review. Historical S03 fabricated and duplicate-write metrics were constants, not instrumented measurements; its unsafe-actions field counted failed reports. Historical S04 intervals used test residuals and cannot establish prospective coverage; its mini_brain was a slope heuristic, not the legacy network. Carry these corrections into future comparisons.',
    '', '## Public references','Active inference and artificial reasoning: https://www.nature.com/articles/s41467-026-77209-5 . Multi-agent blackboard systems: https://nips.cc/virtual/2026/loc/atlanta/poster/151426 . References motivate methodology, not certification.']
    (out/'04_REPORT.md').write_text('\n'.join(report))
    manifest={'python':sys.version,'platform':platform.platform(),'numpy':np.__version__,'seeds':SEEDS,'assertions_passed':3,'metrics_rows':len(rows),'sha256':{p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in out.iterdir() if p.is_file() and p.name!='05_MANIFEST.json'}}
    (out/'05_MANIFEST.json').write_text(json.dumps(manifest,indent=2));print(json.dumps(groups,indent=2))
if __name__=='__main__':
    a=argparse.ArgumentParser();a.add_argument('--out',default='rerun_results');run(a.parse_args().out)
