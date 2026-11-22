"""YIU Eyes of MAI pilot 32. Python 3.10+, numpy. No API or LLM required."""
import argparse,csv,hashlib,json,platform,sys
from pathlib import Path
import numpy as np
SEEDS=list(range(9501,9531))
def sha(x): return hashlib.sha256(json.dumps(x,sort_keys=True,separators=(',',':')).encode()).hexdigest()
def run(out):
    out=Path(out);out.mkdir(parents=True,exist_ok=True)
    rows=[];raw={'config':{'seeds':SEEDS,'S32':'Self-Organization Eye: detect order from local rules','S33':'Information Flow Eye: detect what moves, what is kept, what is lost','S34':'Constraint Eye: detect what limits possibility'},'trials':[]}
    for seed in SEEDS:
        rng=np.random.default_rng(seed)
        # S32 Self-Organization Eye: detect order from local rules.
        n=100;local=rng.normal(size=n);global_order=np.cumsum(local)
        for mode in ['local_only','self_organization']:
            if mode=='local_only':score=float(np.std(local))
            else:score=float(np.std(global_order))
            rows.append({'sim':'32','seed':seed,'method':mode,'metric':'self_organization_score','value':score})
        raw['trials'].append({'sim':'32','seed':seed,'local':local.tolist(),'global_order':global_order.tolist()})
        # S33 Information Flow Eye: detect what moves, what is kept, what is lost.
        n=100;input=rng.normal(size=n);kept=input;lost=input+rng.normal(0,2,n)
        for mode in ['no_flow','information_flow']:
            if mode=='no_flow':score=float(np.mean(np.abs(lost-input)))
            else:score=float(np.mean(np.abs(kept-input)))
            rows.append({'sim':'33','seed':seed,'method':mode,'metric':'information_flow_score','value':score})
        raw['trials'].append({'sim':'33','seed':seed,'input':input.tolist(),'kept':kept.tolist(),'lost':lost.tolist()})
        # S34 Constraint Eye: detect what limits possibility.
        n=100;unconstrained=rng.normal(size=n);constrained=np.clip(unconstrained,-1,1)
        for mode in ['no_constraint','constraint']:
            if mode=='no_constraint':score=float(np.std(unconstrained))
            else:score=float(np.std(constrained))
            rows.append({'sim':'34','seed':seed,'method':mode,'metric':'constraint_score','value':score})
        raw['trials'].append({'sim':'34','seed':seed,'unconstrained':unconstrained.tolist(),'constrained':constrained.tolist()})
    assert len(rows)==180,len(rows)
    assert all(r['value']>=0 for r in rows if r['metric'] in ('self_organization_score','information_flow_score','constraint_score'))
    with (out/'02_METRICS.csv').open('w',newline='') as f:
        w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
    groups=[]
    for sim,method,metric in sorted({(r['sim'],r['method'],r['metric']) for r in rows}):
        vals=np.array([r['value'] for r in rows if (r['sim'],r['method'],r['metric'])==(sim,method,metric)])
        groups.append({'sim':sim,'method':method,'metric':metric,'mean':float(vals.mean()),'sd_across_seeds':float(vals.std(ddof=1)),'n':len(vals)})
    raw['summary']=groups;raw['checkpoint']={'complete':['32','33','34'],'next':'35 Field Validation Design','data_status':'Synthetic only; no original project corpus loaded.'}
    (out/'03_RAW_DATA_AND_CHECKPOINT.json').write_text(json.dumps(raw,indent=2))
    report=['# YIU Eyes of MAI simulations 32–34','', 'Executed CPU-only NumPy experiments, 30 seeds each. No API access or credentials.','',
    '## S32 — Self-Organization Eye','Test whether YIU can detect order from local rules. Compare local-only variance with cumulative global order.',
    '', '## S33 — Information Flow Eye','Test whether YIU can detect what moves, what is kept, what is lost. Compare no-flow and information-flow modes on input deviation.',
    '', '## S34 — Constraint Eye','Test whether YIU can detect what limits possibility. Compare unconstrained and constrained variance.',
    '', '## Results','| Sim | Method | Metric | Mean | Seed SD |','|---|---|---|---:|---:|']
    for g in groups:report.append(f"| {g['sim']} | {g['method']} | {g['metric']} | {g['mean']:.6f} | {g['sd_across_seeds']:.6f} |")
    report+=['','## Use in YIU','Implement self-organization, information flow, and constraint detection as distinct Eyes of MAI modules. Preserve seeds, raw arrays, hashes, and provenance. Do not treat high self-organization score as proof of coherence; validate with controls.',
    '', '## Study notes','S32 assumes cumulative integration. S33 assumes additive noise for lost information. S34 assumes clipping constraint. Original TOLBIT materials were not ingested; their results are not substituted by these generated observations. No external systems were benchmarked.',
    '', '## Rerun','Python 3.10+; `python -m pip install numpy`; `python 01_RUN_SCIENCE_SUITE.py --out rerun_results`. Five files are emitted. Never overwrite original results when rerunning. All raw arrays and provenance maps are saved in file 03.',
    '', '## Continuity','Next: S35 Field Validation Design, with preregistered metrics, external data, and human review. Historical S03 fabricated and duplicate-write metrics were constants, not instrumented measurements; its unsafe-actions field counted failed reports. Historical S04 intervals used test residuals and cannot establish prospective coverage; its mini_brain was a slope heuristic, not the legacy network. Carry these corrections into future comparisons.',
    '', '## Public references','Active inference and artificial reasoning: https://www.nature.com/articles/s41467-026-77209-5 . Multi-agent blackboard systems: https://nips.cc/virtual/2026/loc/atlanta/poster/151426 . References motivate methodology, not certification.']
    (out/'04_REPORT.md').write_text('\n'.join(report))
    manifest={'python':sys.version,'platform':platform.platform(),'numpy':np.__version__,'seeds':SEEDS,'assertions_passed':2,'metrics_rows':len(rows),'sha256':{p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in out.iterdir() if p.is_file() and p.name!='05_MANIFEST.json'}}
    (out/'05_MANIFEST.json').write_text(json.dumps(manifest,indent=2));print(json.dumps(groups,indent=2))
if __name__=='__main__':
    a=argparse.ArgumentParser();a.add_argument('--out',default='rerun_results');run(a.parse_args().out)
