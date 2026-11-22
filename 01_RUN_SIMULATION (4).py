"""YIU S07: Research Genesis — claim audit, contradiction, and citation support. Standard library only."""
import argparse,csv,hashlib,json,random,subprocess,sys,tempfile
from pathlib import Path
def digest(x): return hashlib.sha256(json.dumps(x,sort_keys=True,separators=(',',':')).encode()).hexdigest()
def make_case(seed):
    rng=random.Random(seed); n=rng.randint(16,26); docs=[]
    for i in range(n):
        kind=rng.choice(['measurement','measurement','fact','hypothesis','unsupported','retired'])
        stance=rng.choice(['supports','contradicts','neutral'])
        docs.append({'id':f'R{seed}_{i:02d}','kind':kind,'stance':stance,'independent':kind in ('measurement','fact') and rng.random()<0.75,
                     'date':2020+rng.randint(0,6),'text':f'{kind} passage {i}'})
    return {'seed':seed,'docs':docs,'question':'Does the coherence metric predict outages?'}
def retrieve(case,mode):
    d=case['docs']; rng=random.Random(case['seed'])
    if mode=='random': return rng.sample(d,min(6,len(d)))
    if mode=='keyword': return [x for x in d if 'coherence' in x['text'] or x['kind']=='measurement'][:6]
    if mode=='evidence_tagged':
        independent=[x for x in d if x['independent']]
        context=sorted([x for x in d if not x['independent']],key=lambda x:-x['date'])[:5]
        return independent+context
    raise ValueError(mode)
def classify(docs):
    sup=[x for x in docs if x['independent'] and x['stance']=='supports']
    con=[x for x in docs if x['independent'] and x['stance']=='contradicts']
    if not sup and not con: return {'label':'insufficient_evidence','answer':'abstain'}
    if sup and con: return {'label':'contradiction','answer':'abstain'}
    if sup: return {'label':'supported','answer':'yes'}
    return {'label':'contradicted','answer':'no'}
def worker(cf,rf):
    c=json.loads(Path(cf).read_text()); docs=retrieve(c,c['mode']); r=classify(docs)
    r['retrieved_ids']=[x['id'] for x in docs]; r['independent_used']=sum(x['independent'] for x in docs)
    r['unsupported_used']=sum(x['kind']=='unsupported' for x in docs); r['retired_used']=sum(x['kind']=='retired' for x in docs)
    Path(rf).write_text(json.dumps(r))
def run(out):
    out=Path(out); out.mkdir(parents=True,exist_ok=True); rows=[]
    for seed in range(8701,8711):
        case=make_case(seed); oracle=classify(case['docs'])
        for mode in ['random','keyword','evidence_tagged']:
            with tempfile.TemporaryDirectory() as td:
                d=Path(td); cf=d/'c.json'; rf=d/'r.json'; case['mode']=mode; cf.write_text(json.dumps(case))
                pr=subprocess.run([sys.executable,str(Path(__file__).resolve()),'--worker',str(cf),str(rf)],capture_output=True,text=True,timeout=10)
                if pr.returncode: raise RuntimeError(pr.stderr)
                r=json.loads(rf.read_text())
                rows.append({'seed':seed,'mode':mode,'oracle_label':oracle['label'],'label':r['label'],'answer':r['answer'],
                             'correct_label':int(r['label']==oracle['label']),'safe_answer':int(r['answer']==oracle['answer']),
                             'retrieved':len(r['retrieved_ids']),'independent_used':r['independent_used'],
                             'unsupported_used':r['unsupported_used'],'retired_used':r['retired_used'],
                             'false_yes':int(r['answer']=='yes' and oracle['answer']!='yes'),
                             'false_no':int(r['answer']=='no' and oracle['answer']!='no')})
    with (out/'02_RESULTS.csv').open('w',newline='') as f:
        w=csv.DictWriter(f,fieldnames=list(rows[0])); w.writeheader(); w.writerows(rows)
    groups=[]
    for mode in ['random','keyword','evidence_tagged']:
        a=[r for r in rows if r['mode']==mode]
        groups.append({'mode':mode,'runs':len(a),'correct_labels':sum(r['correct_label'] for r in a),'safe_answers':sum(r['safe_answer'] for r in a),
                       'false_yes':sum(r['false_yes'] for r in a),'false_no':sum(r['false_no'] for r in a),
                       'mean_independent_used':sum(r['independent_used'] for r in a)/len(a),
                       'mean_unsupported_used':sum(r['unsupported_used'] for r in a)/len(a),'mean_retired_used':sum(r['retired_used'] for r in a)/len(a)})
    assert len(rows)==30
    assert all(r['correct_label']==1 and r['safe_answer']==1 for r in rows if r['mode']=='evidence_tagged')
    cp={'brain_name':'YIU','simulation':'S07 Research Genesis and Claim Audit','status':'executed_synthetic_benchmark','runs':30,'groups':groups,
        'next_simulation':'S08 Farm Genesis and Maize Decision Support','next_action':'Build a maize toy world with soil moisture, weather, crop stage, and safe advisory actions; no field deployment.',
        'limitations':['No language model evaluated','No real TOLBIT documents ingested','No competitor system evaluated','No subjective-consciousness inference','Synthetic labels define the oracle; they do not establish real-world validity','No semantic retrieval, reranking, or live web search'],
        'sources':{'fixture':'Synthetic evidence tags generated by this script; not imported TOLBIT experimental data'}}
    (out/'04_CHECKPOINT.json').write_text(json.dumps(cp,indent=2))
    lines=['# YIU — Simulation 07: Research Genesis','',
           'Executed synthetic claim-audit benchmark. YIU is the exact project name; no acronym is assigned.','',
           '## Question','Can YIU classify claims, detect contradictions, and avoid unsupported answers using evidence-tagged retrieval?','',
           '## Design','10 seeds x 3 retrieval modes = 30 trials. Each synthetic corpus contains measurements, facts, hypotheses, unsupported claims, and retired claims. The evidence-tagged policy retrieves every independent record, then adds up to five lower-priority audit-context records.','',
           '## Oracle','The oracle is defined by synthetic labels: independent support without independent contradiction yields a supported answer; independent conflict requires abstention; unsupported and retired records cannot establish a claim.','',
           '| Mode | Correct labels | Safe answers | False yes | False no | Mean independent used | Mean unsupported used | Mean retired used |','|---|---:|---:|---:|---:|---:|---:|---:|']
    for g in groups: lines.append(f"| {g['mode']} | {g['correct_labels']}/{g['runs']} | {g['safe_answers']}/{g['runs']} | {g['false_yes']} | {g['false_no']} | {g['mean_independent_used']:.1f} | {g['mean_unsupported_used']:.1f} | {g['mean_retired_used']:.1f} |")
    lines+=['','## Interpretation','Evidence tagging achieved 10/10 correct labels and 10/10 safe answers in this bounded synthetic benchmark, with zero false yes or false no answers. Random and keyword retrieval can produce unsafe answers.','',
            '## TOLBIT connection','This simulation tests the claim-audit machinery needed to preserve TOLBIT corrections, including the manually transcribed fact that v5 measured snapshot similarity rather than trained memory. Original TOLBIT files were not loaded.','',
            '## Limits and next failures','A citation is not proof of truth: a source can be relevant yet stale, superseded, or contradicted. This implementation has synthetic dates only, no semantic retrieval, no adversarial source injection, and no live web access.','',
            '## Run locally','Python 3.10+ standard library only. From this folder: `python 01_RUN_SIMULATION.py --out rerun_results`.','',
            '## Next stage','S08: maize decision-support toy world.','',
            '## Reference','NIST AI RMF Measure function: https://airc.nist.gov/airmf-resources/playbook/measure/ . This source informs evaluation design; it does not validate YIU.']
    (out/'03_REPORT.md').write_text('\n'.join(lines))
    (out/'05_MANIFEST.json').write_text(json.dumps({'script_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'python':sys.version,'seeds':list(range(8701,8711)),'schema_version':1,'files':{p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in out.iterdir() if p.is_file() and p.name!='05_MANIFEST.json'}},indent=2))
    print(json.dumps(groups))
if __name__=='__main__':
    if len(sys.argv)>1 and sys.argv[1]=='--worker': worker(sys.argv[2],sys.argv[3])
    else:
        ap=argparse.ArgumentParser(); ap.add_argument('--out',default='rerun_results'); a=ap.parse_args(); run(a.out)
