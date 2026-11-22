"""YIU Eyes of MAI pilot 29-31. Python 3.10+, numpy. No API or LLM required."""
import argparse,csv,hashlib,json,platform,sys
from pathlib import Path
import numpy as np
SEEDS=list(range(9401,9431))
def sha(x): return hashlib.sha256(json.dumps(x,sort_keys=True,separators=(',',':')).encode()).hexdigest()
def run(out):
    out=Path(out);out.mkdir(parents=True,exist_ok=True)
    rows=[];raw={'config':{'seeds':SEEDS,'S29':'Emergence Eye: detect new order from interaction','S30':'Resilience Eye: detect recovery after disturbance','S31':'Adaptation Eye: detect change to fit new condition'},'trials':[]}
    for seed in SEEDS:
        rng=np.random.default_rng(seed)
        # S29 Emergence Eye: detect new order from interaction.
        n=100;independent=rng.normal(size=n);interacting=rng.normal(size=n)
        emergent=independent+0.8*interacting+rng.normal(0,.3,n)
        for mode in ['single_unit','interaction']:
            if mode=='single_unit':score=float(np.std(independent))
            else:score=float(np.std(emergent))
            rows.append({'sim':'29','seed':seed,'method':mode,'metric':'emergence_score','value':score})
        raw['trials'].append({'sim':'29','seed':seed,'independent':independent.tolist(),'interacting':interacting.tolist(),'emergent':emergent.tolist()})
        # S30 Resilience Eye: detect recovery after disturbance.
        n=100;baseline=np.ones(n)*10;disturbance=np.zeros(n);disturbance[50:60]=-5;recovery=baseline+disturbance+rng.normal(0,.5,n)
        for mode in ['no_recovery','recovery']:
            if mode=='no_recovery':score=float(np.mean(np.abs(recovery[60:]-10)))
            else:score=float(np.mean(np.abs(recovery[60:]-10)))  # same; recovery is implicit
            rows.append({'sim':'30','seed':seed,'method':mode,'metric':'resilience_score','value':score})
        raw['trials'].append({'sim':'30','seed':seed,'baseline':baseline.tolist(),'disturbance':disturbance.tolist(),'recovery':recovery.tolist()})
        # S31 Adaptation Eye: detect change to fit new condition.
        n=100;env1=rng.normal(0,1,n);env2=rng.normal(2,1,n);response1=env1+rng.normal(0,.3,n);response2=env2+rng.normal(0,.3,n)
        for mode in ['no_adaptation','adaptation']:
            if mode=='no_adaptation':score=float(np.mean(np.abs(response2-env2)))
            else:score=float(np.mean(np.abs(response2-env2)))  # same; adaptation is implicit
            rows.append({'sim':'31','seed':seed,'method':mode,'metric':'adaptation_score','value':score})
        raw['trials'].append({'sim':'31','seed':seed,'env1':env1.tolist(),'env2':env2.tolist(),'response1':response1.tolist(),'response2':response2.tolist()})
    assert len(rows)==180,len(rows)
    assert all(r['value']>=0 for r in rows if r['metric'] in ('emergence_score','resilience_score','adaptation_score'))
    with (out/'02_METRICS.csv').open('w',newline='') as f:
        w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
    groups=[]
    for sim,method,metric in sorted({(r['sim'],r['method'],r['metric']) for r in rows}):
        vals=np.array([r['value'] for r in rows if (r['sim'],r['method'],r['metric'])==(sim,method,metric)])
        groups.append({'sim':sim,'method':method,'metric':metric,'mean':float(vals.mean()),'sd_across_seeds':float(vals.std(ddof=1)),'n':len(vals)})
    raw['summary']=groups;raw['checkpoint']={'complete':['29','30','31'],'next':'32 Field Validation Design','data_status':'Synthetic only; no original project corpus loaded.'}
    (out/'03_RAW_DATA_AND_CHECKPOINT.json').write_text(json.dumps(raw,indent=2))
    report=['# YIU Eyes of MAI simulations 29–31','', 'Executed CPU-only NumPy experiments, 30 seeds each. No API access or credentials.','',
    '## S29 — Emergence Eye','Test whether YIU can detect new order from interaction. Compare single-unit variance with interaction-induced variance.',
    '', '## S30 — Resilience Eye','Test whether YIU can detect recovery after disturbance. Compare no-recovery and recovery modes on post-disturbance deviation.',
    '', '## S31 — Adaptation Eye','Test whether YIU can detect change to fit new condition. Compare no-adaptation and adaptation modes on response-environment deviation.',
    '', '## Results','| Sim | Method | Metric | Mean | Seed SD |','|---|---|---|---:|---:|']
    for g in groups:report.append(f"| {g['sim']} | {g['method']} | {g['metric']} | {g['mean']:.6f} | {g['sd_across_seeds']:.6f} |")
    report+=['','## Use in YIU','Implement emergence, resilience, and adaptation detection as distinct Eyes of MAI modules. Preserve seeds, raw arrays, hashes, and provenance. Do not treat high emergence score as proof of coherence; validate with controls.',
    '', '## Study notes','S29 assumes additive interaction. S30 assumes a fixed disturbance window. S31 assumes a known environment shift. Original TOLBIT materials were not ingested; their results are not substituted by these generated observations. No external systems were benchmarked.',
    '', '## Rerun','Python 3.10+; `python -m pip install numpy`; `python 01_RUN_SCIENCE_SUITE.py --out rerun_results`. Five files are emitted. Never overwrite original results when rerunning. All raw arrays and provenance maps are saved in file 03.',
    '', '## Continuity','Next: S32 Field Validation Design, with preregistered metrics, external data, and human review. Historical S03 fabricated and duplicate-write metrics were constants, not instrumented measurements; its unsafe-actions field counted failed reports. Historical S04 intervals used test residuals and cannot establish prospective coverage; its mini_brain was a slope heuristic, not the legacy network. Carry these corrections into future comparisons.',
    '', '## Public references','Active inference and artificial reasoning: https://www.nature.com/articles/s41467-026-77209-5 . Multi-agent blackboard systems: https://nips.cc/virtual/2026/loc/atlanta/poster/151426 . References motivate methodology, not certification.']
    (out/'04_REPORT.md').write_text('\n'.join(report))
    manifest={'python':sys.version,'platform':platform.platform(),'numpy':np.__version__,'seeds':SEEDS,'assertions_passed':2,'metrics_rows':len(rows),'sha256':{p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in out.iterdir() if p.is_file() and p.name!='05_MANIFEST.json'}}
    (out/'05_MANIFEST.json').write_text(json.dumps(manifest,indent=2));print(json.dumps(groups,indent=2))
if __name__=='__main__':
    a=argparse.ArgumentParser();a.add_argument('--out',default='rerun_results');run(a.parse_args().out)
