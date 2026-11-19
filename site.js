
    document.getElementById('year').textContent = new Date().getFullYear();
    const commercial = document.querySelector('.video-player video');
    const videoShell = document.querySelector('.video-shell');
    const videoPlayer = document.querySelector('.video-player');
    const videoPlayButton = document.querySelector('.video-play');
    if (commercial && videoShell && videoPlayer && videoPlayButton) {
      const ready = () => videoShell.classList.add('is-ready');
      commercial.addEventListener('loadedmetadata', ready);
      commercial.addEventListener('canplay', ready);
      if (commercial.readyState >= 1) ready();
      videoPlayButton.addEventListener('click', () => {
        ready();
        const result = commercial.play();
        if (result && typeof result.catch === 'function') {
          result.catch(() => { videoPlayer.classList.remove('is-playing'); });
        }
      });
      commercial.addEventListener('play', () => videoPlayer.classList.add('is-playing'));
      commercial.addEventListener('pause', () => videoPlayer.classList.remove('is-playing'));
      commercial.addEventListener('ended', () => videoPlayer.classList.remove('is-playing'));
    }

    // Self-contained public dashboard demo. All records below are fictional.
    (() => {
      const root = document.getElementById('demo-app');
      if (!root) return;
      const scenarios = [
        {
          id:'DEMO-01',domain:'AI-enabled fraud',title:'Synthetic-identity payment funnel',
          score:86,confidence:74,status:'ESCALATE',novelty:88,foreign:61,exposure:83,velocity:90,
          summary:'Simulated impersonation domains and synthetic identities converge on repeat payment requests and digital-asset conversion.',
          chain:['Open-source mention','Cloned web domains','Linked payment requests','Fintech exposure'],
          implication:'A hypothetical cluster could strain identity controls and create exposure at payment initiation and digital-asset conversion.',
          next:'Corroborate distinct sources, test the entity links, and escalate validated indicators to fraud and AML analysts.'
        },
        {
          id:'DEMO-02',domain:'Digital assets',title:'Stablecoin settlement-route shift',
          score:82,confidence:68,status:'ESCALATE',novelty:80,foreign:89,exposure:81,velocity:78,
          summary:'Synthetic reporting depicts repeated settlement requests moving between newly observed wallet clusters and regional brokers.',
          chain:['Simulated forum post','Broker identity','Wallet cluster','Institutional off-ramp'],
          implication:'Potential blind spots could emerge where transaction monitoring lacks context for cross-border intermediaries.',
          next:'Validate wallet attribution and distinguish legitimate cross-border settlement from potentially illicit layering.'
        },
        {
          id:'DEMO-03',domain:'Sanctions evasion',title:'Informal broker-network convergence',
          score:78,confidence:76,status:'INVESTIGATE',novelty:72,foreign:92,exposure:77,velocity:69,
          summary:'A fictional hawala-style settlement pattern connects intermediary entities, trading fronts, and mirrored payment instructions.',
          chain:['Overseas reporting','Broker aliases','Trading fronts','Correspondent exposure'],
          implication:'Simulated intermediaries may obscure beneficial ownership and complicate sanctions and counterparty screening.',
          next:'Cross-check entity resolution, jurisdictional exposure, and independent corroboration before reaching conclusions.'
        },
        {
          id:'DEMO-04',domain:'Ransomware',title:'Extortion-payment pattern change',
          score:75,confidence:65,status:'INVESTIGATE',novelty:76,foreign:66,exposure:74,velocity:85,
          summary:'Fictional extortion chatter suggests changing payment instructions and reuse of infrastructure across simulated incidents.',
          chain:['Fictional incident','Negotiation portal','Payment instructions','Exposure review'],
          implication:'New payment tactics could increase response complexity for financial institutions and their corporate clients.',
          next:'Compare independent incident reports and review payment typology indicators without attributing activity prematurely.'
        },
        {
          id:'DEMO-05',domain:'Transnational networks',title:'Precursor logistics-shell overlap',
          score:71,confidence:70,status:'INVESTIGATE',novelty:69,foreign:95,exposure:63,velocity:61,
          summary:'A hypothetical supply-chain pattern connects freight intermediaries, shell-company records, and irregular invoice narratives.',
          chain:['Trade reference','Freight intermediary','Company overlap','Invoice anomaly'],
          implication:'Layered trading entities could complicate recognition of precursor sourcing and illicit-finance facilitation.',
          next:'Validate ownership, shipment context, and source independence before proposing a network-level assessment.'
        },
        {
          id:'DEMO-06',domain:'Dark-web trends',title:'Underground fraud-tool discussion',
          score:69,confidence:62,status:'WATCH',novelty:84,foreign:57,exposure:54,velocity:73,
          summary:'A wholly fabricated Tor-forum discussion describes an emerging fraud-service model and attempts to advertise new tooling.',
          chain:['Synthetic Tor post','Technique mention','Actor alias','Financial risk hypothesis'],
          implication:'Unverified criminal-market claims may foreshadow new fraud methods, but discussion alone does not establish adoption.',
          next:'Watch for independent confirmation and distinguish advertising claims from observed implementation.'
        }
      ];
      const byId = id => document.getElementById(id);
      const list = byId('demo-case-list'), detail = byId('demo-detail'), empty = byId('demo-no-results');
      const search = byId('demo-search'), domain = byId('demo-domain'), status = byId('demo-status');
      let selected = scenarios[0].id;
      const make = (tag, cls, value) => {
        const el = document.createElement(tag);
        if (cls) el.className = cls;
        if (value !== undefined) el.textContent = String(value);
        return el;
      };
      const statusClass = value => value.toLowerCase();
      const avg = Math.round(scenarios.reduce((n,c)=>n+c.confidence,0)/scenarios.length);
      byId('demo-total').textContent = scenarios.length;
      byId('demo-escalate').textContent = scenarios.filter(c=>c.status==='ESCALATE').length;
      byId('demo-average').textContent = avg + '%';
      const filtered = () => {
        const q = search.value.trim().toLowerCase();
        return scenarios.filter(c =>
          (domain.value === 'all' || c.domain === domain.value) &&
          (status.value === 'all' || c.status === status.value) &&
          (!q || [c.id,c.title,c.domain,c.summary,c.status].some(v=>v.toLowerCase().includes(q)))
        ).sort((a,b)=>b.score-a.score);
      };
      function showDetail(c) {
        if (!c) { detail.hidden=true; return; }
        detail.hidden=false;
        byId('demo-selected-id').textContent = c.id + ' · ' + c.domain;
        byId('demo-selected-title').textContent = c.title;
        byId('demo-selected-score').textContent = c.score;
        const label=byId('demo-selected-status');
        label.className='demo-tag ' + statusClass(c.status);
        label.textContent=c.status;
        byId('demo-selected-summary').textContent=c.summary;
        for(const k of ['novelty','foreign','exposure','velocity']){
          const val=String(c[k])+'%';
          const bar=root.querySelector('[data-bar="'+k+'"]');
          const text=root.querySelector('[data-value="'+k+'"]');
          if (bar) bar.style.width=val;
          if (text) text.textContent=val;
        }
        const chain=byId('demo-chain');
        chain.replaceChildren(...c.chain.map(value=>make('li','',value)));
        byId('demo-exposure').textContent=c.implication;
        byId('demo-next-step').textContent=c.next;
        byId('demo-confidence').textContent=c.confidence+'%';
        byId('demo-copy-status').textContent='';
      }
      function render() {
        const items=filtered();
        if(!items.some(c=>c.id===selected))selected=items.length?items[0].id:null;
        list.replaceChildren();
        byId('demo-visible').textContent=items.length;
        empty.hidden=items.length>0;
        items.forEach(c=>{
          const button=make('button','demo-case');
          button.type='button';
          button.setAttribute('aria-pressed',String(c.id===selected));
          button.setAttribute('aria-label',c.title+', synthetic score '+c.score+', '+c.status+'. Select assessment.');
          const top=make('div','demo-case-top');
          top.append(make('span','demo-case-id',c.id+' · '+c.domain),make('span','demo-case-score',c.score));
          const name=make('div','demo-case-title',c.title);
          const meta=make('div','demo-case-meta');
          meta.append(make('span','demo-tag '+statusClass(c.status),c.status),
                      make('span','',c.confidence+'% confidence'));
          button.append(top,name,meta);
          button.addEventListener('click',()=>{selected=c.id;render();});
          list.append(button);
        });
        showDetail(items.find(c=>c.id===selected));
      }
      for(const control of [search,domain,status]){
        control.addEventListener(control===search?'input':'change',render);
      }
      byId('demo-copy').addEventListener('click',async()=>{
        const c=scenarios.find(x=>x.id===selected);
        if(!c) return;
        const copyText='BROODWATCH — SYNTHETIC DEMONSTRATION ONLY\n'
          +c.title+' | Threat score: '+c.score+'/100 | Confidence: '+c.confidence+'% | '+c.status
          +'\nAssessment: '+c.summary+'\nFinancial-system implication: '+c.implication
          +'\nNext analytical step: '+c.next
          +'\nAll data fictional. Not operational intelligence.';
        try{
          await navigator.clipboard.writeText(copyText);
          byId('demo-copy-status').textContent='Sample brief copied (synthetic data only).';
        }catch(_){
          byId('demo-copy-status').textContent='Clipboard unavailable. Select the assessment text above to copy.';
        }
      });
      render();
    })();

  