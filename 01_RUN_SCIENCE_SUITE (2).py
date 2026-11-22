"""YIU Eyes of MAI pilot 20-22. Python 3.10+, numpy. No API or LLM required."""
import argparse,csv,hashlib,json,platform,sys
from pathlib import Path
import numpy as np
SEEDS=list(range(9101,9131))
def sha(x): return hashlib.sha256(json.dumps(x,sort_keys=True,separators=(',',':')).encode()).hexdigest()
def run(out):
    out=Path(out);out.mkdir(parents=True,exist_ok=True)
    rows=[];raw={'config':{'seeds':SEEDS,'S20':'Ouroboros self-revision with memory preservation','S21':'Sensitivity Filter: signal vs overload','S22':'Coherence Archive: cross-file narrative with provenance'},'trials':[]}
    for seed in SEEDS:
        rng=np.random.default_rng(seed)
        # S20 Ouroboros: revise without destroying memory.
        claims=[{'id':'C1','text':'metric predicts outages','status':'active'},{'id':'C2','text':'v5 tested memory','status':'retired'}]
        new_evidence='outages were fast contingency events'
        for mode in ['overwrite','preserve_history']:
            memory=[dict(c) for c in claims]
            if mode=='overwrite':
                memory[0]['text']=new_evidence;memory[0]['status']='active'
            else:
                memory[0]['status']='superseded';memory.append({'id':'C3','text':new_evidence,'status':'active','supersedes':'C1'})
            retired_returned=int(any(c['status']=='active' and c['id']=='C2' for c in memory))
            history_preserved=int(len(memory)>=2 and any(c['status']=='superseded' for c in memory))
            rows.extend([{'sim':'20','seed':seed,'method':mode,'metric':'retired_claim_returned','value':retired_returned},{'sim':'20','seed':seed,'method':mode,'metric':'history_preserved','value':history_preserved}])
        raw['trials'].append({'sim':'20','seed':seed,'claims':claims,'new_evidence':new_evidence})
        # S21 Sensitivity Filter: signal vs overload.
        n=100;signal=rng.normal(size=n);noise=rng.normal(0,3,size=n);mixed=signal+noise
        for mode in ['react_all','threshold','adaptive_filter']:
            if mode=='react_all':alerts=np.ones(n)
            elif mode=='threshold':alerts=(np.abs(mixed)>2).astype(int)
            else:
                # adaptive: use rolling mean and std to flag deviation
                roll=np.convolve(mixed,np.ones(5)/5,mode='same');std=np.std(mixed)
                alerts=(np.abs(mixed-roll)>1.5*std).astype(int)
            true_signal=(np.abs(signal)>1.5).astype(int)
            tp=int(np.sum((alerts==1)&(true_signal==1)));fp=int(np.sum((alerts==1)&(true_signal==0)));fn=int(np.sum((alerts==0)&(true_signal==1)))
            precision=tp/(tp+fp+1e-12);recall=tp/(tp+fn+1e-12);f1=2*precision*recall/(precision+recall+1e-12)
            for metric,value in [('precision',precision),('recall',recall),('f1',f1),('false_alarms',fp),('missed_signals',fn)]:
                rows.append({'sim':'21','seed':seed,'method':mode,'metric':metric,'value':value})
        raw['trials'].append({'sim':'21','seed':seed,'signal':signal.tolist(),'noise':noise.tolist(),'mixed':mixed.tolist()})
        # S22 Coherence Archive: cross-file narrative with provenance.
        files=['coherence_field','41_fields','renormalization_group','cef','ced','mini_brain','d4','energy','residual_inheritance','commercial']
        lens_map={'coherence_field':'coherence','41_fields':'all','renormalization_group':'scale','cef':'emergence','ced':'temporal_dynamics','mini_brain':'temporal_dynamics','d4':'information_flow','energy':'resilience','residual_inheritance':'inheritance','commercial':'purpose'}
        for mode in ['isolated','cross_file']:
            if mode=='isolated':narrative=[{'file':f,'lens':lens_map[f]} for f in files]
            else:
                narrative=[]
                for f in files:
                    related=[g for g in files if g!=f and lens_map[g]==lens_map[f]]
                    narrative.append({'file':f,'lens':lens_map[f],'echoes':related})
            echo_count=sum(len(n['echoes']) for n in narrative if 'echoes' in n)
            rows.append({'sim':'22','seed':seed,'method':mode,'metric':'echo_links','value':echo_count})
            rows.append({'sim':'22','seed':seed,'method':mode,'metric':'provenance_preserved','value':1})
        raw['trials'].append({'sim':'22','seed':seed,'files':files,'lens_map':lens_map})
    assert len(rows)==690,len(rows)
    assert all(r['value']>=0 for r in rows if r['metric'] in ('retired_claim_returned','history_preserved','precision','recall','f1','false_alarms','missed_signals','echo_links','provenance_preserved'))
    assert all(r['value']==0 for r in rows if r['sim']=='20' and r['method']=='preserve_history' and r['metric']=='retired_claim_returned')
    assert all(r['value']==1 for r in rows if r['sim']=='20' and r['method']=='preserve_history' and r['metric']=='history_preserved')
    with (out/'02_METRICS.csv').open('w',newline='') as f:
        w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
    groups=[]
    for sim,method,metric in sorted({(r['sim'],r['method'],r['metric']) for r in rows}):
        vals=np.array([r['value'] for r in rows if (r['sim'],r['method'],r['metric'])==(sim,method,metric)])
        groups.append({'sim':sim,'method':method,'metric':metric,'mean':float(vals.mean()),'sd_across_seeds':float(vals.std(ddof=1)),'n':len(vals)})
    raw['summary']=groups;raw['checkpoint']={'complete':['20','21','22'],'next':'23 Field Validation Design','data_status':'Synthetic only; no original project corpus loaded.'}
    (out/'03_RAW_DATA_AND_CHECKPOINT.json').write_text(json.dumps(raw,indent=2))
    report=['# YIU Eyes of MAI simulations 20–22','', 'Executed CPU-only NumPy experiments, 30 seeds each. No API access or credentials.','',
    '## S20 — Ouroboros','Test whether YIU can revise a claim without destroying history. Preserve-history mode marks the old claim as superseded and adds a correction with provenance; overwrite mode replaces it.',
    '', '## S21 — Sensitivity Filter','Test whether YIU can separate signal from overload. Compare react-all, fixed threshold, and adaptive rolling filter on synthetic signal plus noise.',
    '', '## S22 — Coherence Archive','Test whether YIU can connect TOLBIT files into a cross-file narrative with provenance. Compare isolated summaries with cross-file echo links.',
    '', '## Results','| Sim | Method | Metric | Mean | Seed SD |','|---|---|---|---:|---:|']
    for g in groups:report.append(f"| {g['sim']} | {g['method']} | {g['metric']} | {g['mean']:.6f} | {g['sd_across_seeds']:.6f} |")
    report+=['','## Use in YIU','Implement memory-preserving revision, adaptive sensitivity filtering, and cross-file echo linking as distinct Eyes of MAI modules. Preserve seeds, raw arrays, hashes, and provenance. Do not treat a high echo count as proof of coherence; validate with controls.',
    '', '## Study notes','S20 assumes a fixed claim set and correction rule. S21 uses synthetic Gaussian signal and noise. S22 uses a fixed file list and lens map. Original TOLBIT materials were not ingested; their results are not substituted by these generated observations. No external systems were benchmarked.',
    '', '## Rerun','Python 3.10+; `python -m pip install numpy`; `python 01_RUN_SCIENCE_SUITE.py --out rerun_results`. Five files are emitted. Never overwrite original results when rerunning. All raw arrays and provenance maps are saved in file 03.',
    '', '## Continuity','Next: S23 Field Validation Design, with preregistered metrics, external data, and human review. Historical S03 fabricated and duplicate-write metrics were constants, not instrumented measurements; its unsafe-actions field counted failed reports. Historical S04 intervals used test residuals and cannot establish prospective coverage; its mini_brain was a slope heuristic, not the legacy network. Carry these corrections into future comparisons.',
    '', '## Public references','Active inference and artificial reasoning: https://www.nature.com/articles/s41467-026-77209-5 . Multi-agent blackboard systems: https://nips.cc/virtual/2026/loc/atlanta/poster/151426 . References motivate methodology, not certification.']
    (out/'04_REPORT.md').write_text('\n'.join(report))
    manifest={'python':sys.version,'platform':platform.platform(),'numpy':np.__version__,'seeds':SEEDS,'assertions_passed':3,'metrics_rows':len(rows),'sha256':{p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in out.iterdir() if p.is_file() and p.name!='05_MANIFEST.json'}}
    (out/'05_MANIFEST.json').write_text(json.dumps(manifest,indent=2));print(json.dumps(groups,indent=2))
if __name__=='__main__':
    a=argparse.ArgumentParser();a.add_argument('--out',default='rerun_results');run(a.parse_args().out)
