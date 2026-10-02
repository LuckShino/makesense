/* MAKE SENSE Admin Studio — static admin editor; GitHub Contents API for optional cross-device publishing. */
(() => {
  'use strict';
  const KEY='makesense-admin-draft-v1', SETTINGS='makesense-admin-gh-settings-v1';
  const ROWS=['あいうえお','かきくけこ','さしすせそ','たちつてと','なにぬねの','はひふへほ','まみむめも','やゆよ','らりるれろ','わを','ん'];
  const MAP=new Map();
  const coordRows=[['あ','い','う','え','お'],['か','き','く','け','こ'],['さ','し','す','せ','そ'],['た','ち','つ','て','と'],['な','に','ぬ','ね','の'],['は','ひ','ふ','へ','ほ'],['ま','み','む','め','も'],['や',null,'ゆ',null,'よ'],['ら','り','る','れ','ろ'],['わ',null,null,null,'を'],['ん',null,null,null,null]];
  coordRows.forEach((r,y)=>r.forEach((ch,x)=>{if(ch)MAP.set(ch,{x:y+1,y:x+1});}));
  const BANNED=new Set(['うんこ','うんち']);
  const $=id=>document.getElementById(id);
  const text=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const wordOK=w=>typeof w==='string'&&[...w].length===3&&[...w].every(c=>MAP.has(c))&&!BANNED.has(w);
  const area2=w=>{if(!wordOK(w))return null;const [a,b,c]=[...w].map(ch=>MAP.get(ch));return Math.abs((b.x-a.x)*(c.y-a.y)-(c.x-a.x)*(b.y-a.y));};
  const area=w=>{const n=area2(w);return n===null?null:n/2;};
  const clone=o=>JSON.parse(JSON.stringify(o));
  const defaultData=()=>({questions:[],words:[],disabledIds:[]});
  function parseData(o){
    if(!o||!Array.isArray(o.questions)||!Array.isArray(o.words)||!Array.isArray(o.disabledIds))throw Error('questions / words / disabledIds が必要です。');
    if(o.questions.some(q=>!q||!q.id||!['A','B','C','D'].includes(q.genre)))throw Error('問題のIDまたはジャンルが不正です。');
    if(new Set(o.questions.map(q=>q.id)).size!==o.questions.length)throw Error('問題IDが重複しています。');
    for(const q of o.questions)if(!validateQuestion(q).valid)throw Error('問題 '+q.id+'：'+validateQuestion(q).messages.join('、'));
    if(o.words.some(w=>!w||!wordOK(w.word)||!Array.isArray(w.tags)))throw Error('追加単語に不正な形式があります。');
    if(new Set(o.words.map(w=>w.word)).size!==o.words.length)throw Error('追加単語に重複があります。');
    if(o.disabledIds.some(id=>typeof id!=='string'))throw Error('無効化IDが不正です。');
    return {questions:clone(o.questions),words:clone(o.words),disabledIds:[...new Set(o.disabledIds)]};
  }
  const base=new Map((window.MS_QUESTIONS||[]).map(q=>[q.id,q]));
  const baseWords=new Set([...(window.MS_BASE_WORDS||[]),...(window.MS_EXTRA_WORDS||[]).map(x=>typeof x==='string'?x:x.word)]);
  const published=parseData(window.MS_ADMIN_DATA||defaultData());
  let draft=clone(published), editedId=null, wordEditing=null, activeTab='questions', filter='ALL', search='', noticesTimer=null;
  try{const stored=JSON.parse(localStorage.getItem(KEY)||'null');if(stored)draft=parseData(stored);}catch(err){console.warn('管理データの一時保存を読めませんでした',err);}
  const $notice=$('notice');
  function notice(message,error=false){$notice.textContent=message;$notice.className='notice visible'+(error?' error':'');clearTimeout(noticesTimer);noticesTimer=setTimeout(()=>$notice.classList.remove('visible'),7500);}
  function questionMap(){const result=new Map(base);for(const q of draft.questions)result.set(q.id,q);return result;}
  function questions(){return [...questionMap().values()];}
  function isDisabled(id){return draft.disabledIds.includes(id);}
  function saveLocal(){
    try{localStorage.setItem(KEY,JSON.stringify(draft));notice('この端末に保存しました。公開サイトには「GitHubに公開」で反映できます。');}
    catch(err){notice('ブラウザへの保存に失敗しました。JSファイルをダウンロードしてバックアップしてください。',true);}
    renderSummary();renderQuestions();renderWords();
  }
  function renderSummary(){
    const rows=questions(), totals=Object.fromEntries(['A','B','C','D'].map(g=>[g,rows.filter(q=>q.genre===g&&!isDisabled(q.id)&&q.status!=='不採用').length]));
    $('summary').innerHTML='<strong>'+rows.filter(q=>!isDisabled(q.id)&&q.status!=='不採用').length+'問</strong><div>'+Object.entries(totals).map(([g,n])=>g+' '+n).join('　')+'</div><small>追加した単語 '+draft.words.length+'語</small>';
  }
  function validateQuestion(q){
    const messages=[],ws=[q.enemy,q.win,q.draw,q.lose];
    for(const [i,w] of ws.entries())if(!wordOK(w))messages.push(['相手','WIN','DRAW','LOSE'][i]+'は清音ひらがな3文字にしてください');
    if(messages.length)return {valid:false,messages};
    if(new Set(ws).size!==4)messages.push('4つの言葉が重複しています');
    const [e,w,d,l]=ws.map(area2);
    if(!e)messages.push('相手の面積は0にできません');
    if(e===40||w===40||d===40||l===40)messages.push('面積20の言葉は通常戦に使えません');
    if(w<=e)messages.push('WINの面積が相手より大きくありません');
    if(d!==e)messages.push('DRAWの面積が相手と等しくありません');
    if(l>=e)messages.push('LOSEの面積が相手より小さくありません');
    if(q.genre==='C'){
      const pairs=s=>[s.slice(0,2),s.slice(-2)];
      const common=pairs(ws[0]).find(pair=>ws.every(x=>pairs(x).includes(pair)));
      if(!common)messages.push('Cの4語には共通する連続2文字（語頭または語尾）が必要です');
    }
    if(q.genre==='B'&&!q.family?.trim())messages.push('Bはカテゴリ・分類を入力してください');
    return {valid:messages.length===0,messages,scores:[e,w,d,l].map(n=>n/2)};
  }
  function readQuestionForm(){return {id:editedId||'ADMIN-'+Date.now().toString(36).toUpperCase(),genre:$('q-genre').value,enemy:$('q-enemy').value.trim(),win:$('q-win').value.trim(),draw:$('q-draw').value.trim(),lose:$('q-lose').value.trim(),family:$('q-family').value.trim(),note:$('q-note').value.trim(),status:'採用'};}
  function previewQuestion(){
    const raw=readQuestionForm();
    const e=area(raw.enemy);
    $('enemy-preview').textContent=e===null?'相手の面積：ひらがな3文字を入力':`相手の面積：${e}${e===0?'（相手に使用できません）':''}`;
    ['win','draw','lose'].forEach(key=>{
      const w=raw[key],s=area(w),label=$('p-'+key),good=e!==null&&s!==null&&({win:s>e,draw:s===e,lose:s<e}[key]);
      label.textContent=s===null?'面積：未入力':`面積：${s}　${good?'✓ 条件を満たす':'✕ 条件を満たさない'}`;
      label.className=s===null?'':good?'green':'red';
    });
    const r=validateQuestion(raw);const check=$('question-check');
    check.textContent=r.valid?'✓ この三択は有効です。保存できます。':r.messages.join(' ／ ');
    check.className='check '+(r.valid?'success':'warning');
    $('q-save').disabled=!r.valid;
  }
  function resetQuestion(){editedId=null;$('question-form').reset();$('q-genre').value='A';$('question-form-heading').textContent='三択問題を追加する';$('q-save').textContent='この問題を保存';$('q-cancel').hidden=true;previewQuestion();}
  function startEditQuestion(id){
    const q=questionMap().get(id);if(!q)return;
    editedId=id;['genre','enemy','win','draw','lose','family','note'].forEach(k=>{const el=$('q-'+k);if(el)el.value=q[k]||'';});
    $('question-form-heading').textContent='問題を編集：'+id;$('q-save').textContent='変更を保存';$('q-cancel').hidden=false;previewQuestion();
    window.scrollTo({top:0,behavior:'smooth'});
  }
  function renderQuestions(){
    const all=questions();const rows=all.filter(q=>(filter==='ALL'||q.genre===filter)&&(!search||[q.id,q.enemy,q.win,q.draw,q.lose,q.family,q.note].join(' ').includes(search)));
    $('question-count').textContent=rows.length+' / '+all.length+'問';
    $('question-list').innerHTML=rows.map(q=>{
      const disabled=isDisabled(q.id)||q.status==='不採用',modified=draft.questions.some(x=>x.id===q.id);
      return `<article class="question ${disabled?'is-disabled':''}"><div class="question-top"><span class="genre">${text(q.genre)}</span><span class="q-id">${text(q.id)}</span><span class="q-status">${disabled?'無効':modified?'編集・追加':'初期データ'}</span></div>
        <div class="words-line"><strong>${text(q.enemy)}</strong><span>→</span><span class="green">${text(q.win)}</span><span class="yellow">${text(q.draw)}</span><span class="red">${text(q.lose)}</span></div>
        <div class="q-meta">${text(q.family||'自由')}　${text(q.note||'')}</div><div class="q-actions"><button type="button" data-edit="${text(q.id)}">編集</button><button type="button" data-toggle="${text(q.id)}">${disabled?'有効に戻す':'無効にする'}</button>${!base.has(q.id)?`<button type="button" class="danger" data-delete="${text(q.id)}">削除</button>`:''}</div></article>`;
    }).join('')||'<p class="muted">該当する問題はありません。</p>';
  }
  function tags(value){return [...new Set(value.split(/[,、，\n]+/).map(s=>s.trim()).filter(Boolean))];}
  function previewWord(){const w=$('word-value').value.trim(),s=area(w),old=baseWords.has(w)||draft.words.some(x=>x.word===w&&x.word!==wordEditing);const check=$('word-check');
    const message=!w?'単語を入力してください。':s===null?'清音のひらがな3文字で入力してください。':old?'既に登録済みの単語です。':`✓ 面積：${s}。追加できます。`;
    check.textContent=message;check.className='check '+(w&&s!==null&&!old?'success':'warning');$('word-save').disabled=!w||s===null||old;
  }
  function resetWord(){wordEditing=null;$('word-form').reset();$('word-save').textContent='単語を保存';$('word-cancel').hidden=true;previewWord();}
  function renderWords(){
    $('word-count').textContent=draft.words.length+'語';
    $('word-list').innerHTML=draft.words.length?draft.words.map(x=>`<div class="word-row"><strong>${text(x.word)}</strong><span>面積 ${area(x.word)} / ${text(x.tags.join('・')||'カテゴリなし')}</span><button type="button" data-word-edit="${text(x.word)}">編集</button><button class="danger" type="button" data-word-delete="${text(x.word)}">削除</button></div>`).join(''):'<p class="muted">管理画面から追加した単語はまだありません。</p>';
  }
  function generatedJS(data){
    // Serialize data as JSON, never executable user-supplied source.
    const safe=JSON.stringify(data,null,2).replace(/</g,'\\u003c').replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');
    return '/* MAKE SENSE / admin-data.js — 管理画面から生成された公開データ */\nwindow.MS_ADMIN_DATA = '+safe+';\n';
  }
  function download(name,body,mime){const blob=new Blob([body],{type:mime});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);}
  function settings(){return {owner:$('gh-owner').value.trim(),repo:$('gh-repo').value.trim(),branch:$('gh-branch').value.trim()||'main',path:$('gh-path').value.trim()||'data/admin-data.js'};}
  function saveSettings(){try{localStorage.setItem(SETTINGS,JSON.stringify(settings()));}catch(err){}}
  try{const s=JSON.parse(localStorage.getItem(SETTINGS)||'null');if(s)for(const [key,id] of Object.entries({owner:'gh-owner',repo:'gh-repo',branch:'gh-branch',path:'gh-path'}))if(s[key])$(id).value=s[key];}catch(err){}
  function getConfig(){const s=settings(),token=$('gh-token').value.trim();if(!s.owner||!s.repo||!s.branch||!s.path||!token)throw Error('GitHubのユーザー名・リポジトリ・ブランチ・パス・トークンを入力してください。');if(!/^[\w.-]+$/.test(s.owner)||!/^[\w.-]+$/.test(s.repo)||s.path.includes('..')||s.path.startsWith('/'))throw Error('リポジトリ名かファイルパスが不正です。');if(s.path!=='data/admin-data.js')throw Error('このサイトでは公開データのパスを data/admin-data.js にしてください。');saveSettings();return {...s,token};}
  const uri=(s)=>s.split('/').map(encodeURIComponent).join('/');
  function base64encodeUnicode(str){const bytes=new TextEncoder().encode(str);let encoded='';for(let i=0;i<bytes.length;i+=8192)encoded+=String.fromCharCode(...bytes.subarray(i,i+8192));return btoa(encoded);}
  function decodeUnicode64(encoded){const binary=atob(encoded.replace(/\s/g,''));return new TextDecoder().decode(Uint8Array.from(binary,c=>c.charCodeAt(0)));}
  function parsePublishedJS(source){const trimmed=source.trim().replace(/^\/\*[\s\S]*?\*\/\s*/,'');const m=trimmed.match(/^window\.MS_ADMIN_DATA\s*=\s*([\s\S]*?)\s*;?\s*$/);if(!m)throw Error('GitHub上のadmin-data.jsが管理画面の形式と異なります。');return parseData(JSON.parse(m[1].replace(/;\s*$/,'')));}
  function same(a,b){return JSON.stringify(a)===JSON.stringify(b);}
  async function githubFile(config){
    const endpoint=`https://api.github.com/repos/${encodeURIComponent(config.owner)}/${encodeURIComponent(config.repo)}/contents/${uri(config.path)}?ref=${encodeURIComponent(config.branch)}`;
    const response=await fetch(endpoint,{headers:{Accept:'application/vnd.github+json',Authorization:'Bearer '+config.token,'X-GitHub-Api-Version':'2022-11-28'},cache:'no-store'});
    if(!response.ok){let reason;try{reason=(await response.json()).message;}catch(err){}throw Error('GitHubから読み込めませんでした（HTTP '+response.status+'）'+(reason?'：'+reason:''));}
    const file=await response.json();if(!file.content||!file.sha)throw Error('GitHubファイルを読み込めませんでした。');return {sha:file.sha,data:parsePublishedJS(decodeUnicode64(file.content))};
  }
  function ghStatus(t,error=false){$('gh-status').className='check '+(error?'warning':'success');$('gh-status').textContent=t;}
  $('question-form').addEventListener('input',previewQuestion);$('question-form').addEventListener('change',previewQuestion);
  $('question-form').addEventListener('submit',event=>{
    event.preventDefault();const q=readQuestionForm(),r=validateQuestion(q);if(!r.valid){notice(r.messages.join(' ／ '),true);return;}
    if(!editedId){while(questionMap().has(q.id))q.id='ADMIN-'+Math.random().toString(36).slice(2,10).toUpperCase();}
    draft.questions=draft.questions.filter(x=>x.id!==q.id);draft.questions.push(q);
    draft.disabledIds=draft.disabledIds.filter(id=>id!==q.id);saveLocal();resetQuestion();
  });
  $('question-new').addEventListener('click',resetQuestion);$('q-cancel').addEventListener('click',resetQuestion);
  $('q-filter').addEventListener('change',e=>{filter=e.target.value;renderQuestions();});
  $('q-search').addEventListener('input',e=>{search=e.target.value.trim();renderQuestions();});
  $('question-list').addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b)return;
    if(b.dataset.edit)startEditQuestion(b.dataset.edit);
    if(b.dataset.toggle){const id=b.dataset.toggle;if(isDisabled(id)){draft.disabledIds=draft.disabledIds.filter(x=>x!==id);const changed=draft.questions.find(x=>x.id===id);if(changed&&changed.status==='不採用')changed.status='採用';}
      else draft.disabledIds.push(id);saveLocal();}
    if(b.dataset.delete&&confirm('追加問題「'+b.dataset.delete+'」を削除しますか？')){draft.questions=draft.questions.filter(x=>x.id!==b.dataset.delete);draft.disabledIds=draft.disabledIds.filter(x=>x!==b.dataset.delete);saveLocal();if(editedId===b.dataset.delete)resetQuestion();}
  });
  $('word-form').addEventListener('input',previewWord);
  $('word-form').addEventListener('submit',e=>{
    e.preventDefault();if($('word-save').disabled)return;
    const word=$('word-value').value.trim(),item={word,tags:tags($('word-tags').value)};
    draft.words=draft.words.filter(x=>x.word!==wordEditing);draft.words.push(item);saveLocal();resetWord();
  });
  $('word-cancel').addEventListener('click',resetWord);
  $('word-list').addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b)return;
    if(b.dataset.wordEdit){const w=draft.words.find(x=>x.word===b.dataset.wordEdit);if(!w)return;wordEditing=w.word;$('word-value').value=w.word;$('word-tags').value=w.tags.join('、');$('word-save').textContent='変更を保存';$('word-cancel').hidden=false;previewWord();window.scrollTo({top:0,behavior:'smooth'});}
    if(b.dataset.wordDelete&&confirm('単語「'+b.dataset.wordDelete+'」を削除しますか？')){draft.words=draft.words.filter(x=>x.word!==b.dataset.wordDelete);saveLocal();if(wordEditing===b.dataset.wordDelete)resetWord();}
  });
  document.querySelectorAll('[data-tab]').forEach(button=>button.addEventListener('click',()=>{
    activeTab=button.dataset.tab;document.querySelectorAll('[data-tab]').forEach(x=>x.classList.toggle('active',x===button));
    document.querySelectorAll('.view').forEach(x=>x.hidden=x.id!=='view-'+activeTab);window.scrollTo({top:0,behavior:'smooth'});
  }));
  $('export-js').addEventListener('click',()=>{download('admin-data.js',generatedJS(draft),'application/javascript;charset=utf-8');notice('admin-data.jsをダウンロードしました。サイトのdataフォルダに配置してください。');});
  $('export-json').addEventListener('click',()=>{download('makesense-admin-backup.json',JSON.stringify(draft,null,2),'application/json;charset=utf-8');notice('JSONバックアップをダウンロードしました。');});
  $('import-json').addEventListener('change',async e=>{
    const file=e.target.files?.[0];if(!file)return;
    try{const incoming=parseData(JSON.parse(await file.text()));if(!confirm('現在の管理データを読み込んだJSONで置き換えますか？'))return;draft=incoming;saveLocal();resetQuestion();resetWord();notice('JSONデータを読み込みました。');}
    catch(err){notice('読み込み失敗：'+err.message,true);}finally{e.target.value='';}
  });
  $('publish-gh').addEventListener('click',async()=>{
    const button=$('publish-gh');if(button.disabled)return;let config;
    try{config=getConfig();}catch(err){ghStatus(err.message,true);return;}
    button.disabled=true;ghStatus('GitHub上の最新版を確認中…');
    try{
      const remote=await githubFile(config);
      if(!same(remote.data,published))throw Error('GitHub上のデータが管理画面を開いた時点から変更されています。先に「GitHub上のデータを再取得」してください。未公開の編集はJSONでバックアップできます。');
      const url=`https://api.github.com/repos/${encodeURIComponent(config.owner)}/${encodeURIComponent(config.repo)}/contents/${uri(config.path)}`;
      const response=await fetch(url,{method:'PUT',headers:{Accept:'application/vnd.github+json',Authorization:'Bearer '+config.token,'X-GitHub-Api-Version':'2022-11-28','Content-Type':'application/json'},body:JSON.stringify({message:'Update MAKE SENSE questions from admin studio',content:base64encodeUnicode(generatedJS(draft)),sha:remote.sha,branch:config.branch})});
      if(!response.ok){let reason;try{reason=(await response.json()).message;}catch(err){}throw Error('公開に失敗しました（HTTP '+response.status+'）'+(reason?'：'+reason:''));}
      Object.assign(published,clone(draft));try{localStorage.removeItem(KEY);}catch(err){}
      ghStatus('✓ GitHubへの保存に成功。GitHub Pagesの再公開後、スマホ・PCの両方で最新データを読み込めます（数分かかる場合があります）。');notice('GitHubへの公開が完了しました。');
    }catch(err){ghStatus(err.message,true);}finally{button.disabled=false;}
  });
  $('reload-gh').addEventListener('click',async()=>{
    let config;try{config=getConfig();}catch(err){ghStatus(err.message,true);return;}
    if(!confirm('現在の未公開編集を破棄し、GitHub上のデータで置き換えますか？ 必要なら先にJSONでバックアップしてください。'))return;
    const button=$('reload-gh');button.disabled=true;ghStatus('GitHubのデータを読み込み中…');
    try{const remote=await githubFile(config);draft=clone(remote.data);Object.assign(published,clone(remote.data));try{localStorage.removeItem(KEY);}catch(err){}renderSummary();renderQuestions();renderWords();resetQuestion();resetWord();ghStatus('✓ GitHubの最新データを読み込みました。');}
    catch(err){ghStatus(err.message,true);}finally{button.disabled=false;}
  });
  $('gh-owner').addEventListener('change',saveSettings);$('gh-repo').addEventListener('change',saveSettings);$('gh-branch').addEventListener('change',saveSettings);$('gh-path').addEventListener('change',saveSettings);
  resetQuestion();resetWord();renderSummary();renderQuestions();renderWords();
})();
