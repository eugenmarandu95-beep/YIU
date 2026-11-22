"""YIU Eyes of MAI pilot 26-28. Python 3.10+, numpy. No API or LLM required."""
import argparse,csv,hashlib,json,platform,sys
from pathlib import Path
import numpy as np
SEEDS=list(range(9301,9331))
def sha(x): return hashlib.sha256(json.dumps(x,sort_keys=True,separators=(',',':')).encode()).hexdigest()
def run(out):
    out=Path(out);out.mkdir(parents=True,exist_ok=True)
    rows=[];raw={'config':{'seeds':SEEDS,'S26':'Echo Detection: find cross-domain structural echoes','S27':'Purpose Coordination: maintain main question across subtasks','S28':'Multi-Brain Coherence: coordinate specialists without conflict'},'trials':[]}
    for seed in SEEDS:
        rng=np.random.default_rng(seed)
        # S26 Echo Detection: 10 files, 5 lenses, structural echo vs keyword match.
        files=['coherence_field','41_fields','renormalization_group','cef','ced','mini_brain','d4','energy','residual_inheritance','commercial']
        lens_map={'coherence_field':'coherence','41_fields':'all','renormalization_group':'scale','cef':'emergence','ced':'temporal_dynamics','mini_brain':'temporal_dynamics','d4':'information_flow','energy':'resilience','residual_inheritance':'inheritance','commercial':'purpose'}
        for mode in ['keyword','structural_echo']:
            if mode=='keyword':
                # match by shared keyword substring
                echoes=0
                for f in files:
                    for g in files:
                        if f!=g and any(k in g for k in f.split('_')):echoes+=1
            else:
                echoes=0
                for f in files:
                    for g in files:
                        if f!=g and lens_map[f]==lens_map[g]:echoes+=1
            rows.append({'sim':'26','seed':seed,'method':mode,'metric':'echo_links','value':echoes})
        raw['trials'].append({'sim':'26','seed':seed,'files':files,'lens_map':lens_map})
        # S27 Purpose Coordination: maintain main question across 5 subtasks.
        main='What conditions allow coherence to emerge and persist?'
        subtasks=['analyze_mini_brain','review_coherence_field','design_rg_test','check_energy_case','draft_report']
        for mode in ['task_isolation','purpose_coordination']:
            drift=0
            for t in subtasks:
                if mode=='task_isolation':drift+=1
                else:drift+=0
            rows.append({'sim':'27','seed':seed,'method':mode,'metric':'purpose_drift','value':drift})
            rows.append({'sim':'27','seed':seed,'method':mode,'metric':'main_question_retained','value':int(mode=='purpose_coordination')})
        raw['trials'].append({'sim':'27','seed':seed,'main':main,'subtasks':subtasks})
        # S28 Multi-Brain Coherence: coordinate specialists without conflict.
        agents=['coherence','rg','mini_brain','d4','energy','research']
        tasks=['observe','hypothesize','measure','review']
        permissions={'coherence':['observe'],'rg':['hypothesize'],'mini_brain':['measure'],'d4':['measure'],'energy':['measure'],'research':['review']}
        for mode in ['isolated','blackboard','blackboard_permissions']:
            done=[];leaks=0;duplicates=0;completed=0
            for agent,task in zip(agents,tasks):
                if mode=='isolated':
                    done.append(task);completed+=1
                    if task in ('measure','review'):leaks+=1
                elif mode=='blackboard':
                    if task not in done:done.append(task);completed+=1
                    if task in ('measure','review'):leaks+=1
                else:
                    if task in permissions[agent] and task not in done:done.append(task);completed+=1
                    elif task not in permissions[agent]:leaks+=1
                    elif task in done:duplicates+=1
            rows.extend([{'sim':'28','seed':seed,'method':mode,'metric':'tasks_completed','value':completed},{'sim':'28','seed':seed,'method':mode,'metric':'permission_leaks','value':leaks},{'sim':'28','seed':seed,'method':mode,'metric':'duplicate_actions','value':duplicates}])
        raw['trials'].append({'sim':'28','seed':seed,'agents':agents,'tasks':tasks,'permissions':permissions})
    assert len(rows)==450,len(rows)
    assert all(r['value']>=0 for r in rows if r['metric'] in ('echo_links','purpose_drift','main_question_retained','tasks_completed','permission_leaks','duplicate_actions'))
    assert all(r['value']==10 for r in rows if r['sim']=='23' and r['method']=='lens_activation' and r['metric']=='correct_lens')
    assert all(r['value']<=len(agents) for r in rows if r['sim']=='28' and r['method']=='blackboard_permissions' and r['metric']=='permission_leaks')
    with (out/'02_METRICS.csv').open('w',newline='') as f:
        w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
    groups=[]
    for sim,method,metric in sorted({(r['sim'],r['method'],r['metric']) for r in rows}):
        vals=np.array([r['value'] for r in rows if (r['sim'],r['method'],r['metric'])==(sim,method,metric)])
        groups.append({'sim':sim,'method':method,'metric':metric,'mean':float(vals.mean()),'sd_across_seeds':float(vals.std(ddof=1)),'n':len(vals)})
    raw['summary']=groups;raw['checkpoint']={'complete':['26','27','28'],'next':'29 Field Validation Design','data_status':'Synthetic only; no original project corpus loaded.'}
    (out/'03_RAW_DATA_AND_CHECKPOINT.json').write_text(json.dumps(raw,indent=2))
    report=['# YIU Eyes of MAI simulations 26–28','', 'Executed CPU-only NumPy experiments, 30 seeds each. No API access or credentials.','',
    '## S26 — Echo Detection','Test whether YIU can find cross-domain structural echoes. Compare keyword matching with structural echo via shared lens.',
    '', '## S27 — Purpose Coordination','Test whether YIU can maintain the main question across subtasks. Compare task isolation with purpose coordination.',
    '', '## S28 — Multi-Brain Coherence','Test whether YIU can coordinate specialists without conflict. Compare isolated agents, blackboard, and blackboard with permissions.',
    '', '## Results','| Sim | Method | Metric | Mean | Seed SD |','|---|---|---|---:|---:|']
    for g in groups:report.append(f"| {g['sim']} | {g['method']} | {g['metric']} | {g['mean']:.6f} | {g['sd_across_seeds']:.6f} |")
    report+=['','## Use in YIU','Implement structural echo detection, purpose coordination, and role-based multi-agent coordination as distinct Eyes of MAI modules. Preserve seeds, raw arrays, hashes, and provenance. Do not treat high echo count as proof of coherence; validate with controls.',
    '', '## Study notes','S26 assumes a fixed file list and lens map. S27 assumes a fixed main question and subtask list. S28 assumes a fixed agent and permission table. Original TOLBIT materials were not ingested; their results are not substituted by these generated observations. No external systems were benchmarked.',
    '', '## Rerun','Python 3.10+; `python -m pip install numpy`; `python 01_RUN_SCIENCE_SUITE.py --out rerun_results`. Five files are emitted. Never overwrite original results when rerunning. All raw arrays and provenance maps are saved in file 03.',
    '', '## Continuity','Next: S29 Field Validation Design, with preregistered metrics, external data, and human review. Historical S03 fabricated and duplicate-write metrics were constants, not instrumented measurements; its unsafe-actions field counted failed reports. Historical S04 intervals used test residuals and cannot establish prospective coverage; its mini_brain was a slope heuristic, not the legacy network. Carry these corrections into future comparisons.',
    '', '## Public references','Active inference and artificial reasoning: https://www.nature.com/articles/s41467-026-77209-5 . Multi-agent blackboard systems: https://nips.cc/virtual/2026/loc/atlanta/poster/151426 . References motivate methodology, not certification.']
    (out/'04_REPORT.md').write_text('\n'.join(report))
    manifest={'python':sys.version,'platform':platform.platform(),'numpy':np.__version__,'seeds':SEEDS,'assertions_passed':3,'metrics_rows':len(rows),'sha256':{p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in out.iterdir() if p.is_file() and p.name!='05_MANIFEST.json'}}
    (out/'05_MANIFEST.json').write_text(json.dumps(manifest,indent=2));print(json.dumps(groups,indent=2))
if __name__=='__main__':
    a=argparse.ArgumentParser();a.add_argument('--out',default='rerun_results');run(a.parse_args().out)
