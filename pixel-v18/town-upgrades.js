/* V18: conversation and presentation upgrades; gameplay and assets stay on V17. */
window.MS_UPGRADE_TOWN=function(html){
const changes=[
  [
    "戦・異論${attempts}回目の挑戦でクリア！",
    "戦・${attempts}回目の挑戦でクリア！"
  ],
  [
    "function render(){",
    "// Added inside the game's existing closure. Conversation memory shares the existing save.\nconst townDialogue={\n veg:{\n  first:'いらっしゃい！ 野菜に果物、それとも言葉の勝負かい？ どれでも歓迎だよ！',\n  revisit:['おや、また来たね。今日は何を持ってきたんだい？','いい顔してるねえ。言葉、だいぶ集まったみたいじゃないか。','今日はどんな言葉が実るかねえ。ゆっくり見ておいで。'],\n  wins:['やるねえ！ まずは一勝、景気がいいじゃないか。','二つ続いたねえ。いい調子じゃないか！','三つ続いたかい！ こりゃあ大豊作だ。','四つまで来たかい。あと一つ、実らせてみな！','五連勝！ お見事。こいつは今日一番の収穫だよ！'],\n  draw:'おや、同じ強さかい。こんな組み合わせもあるんだねえ。',\n  lose:'おっと、今回はこっちの勝ちだね。まあ、次があるさ！',\n  questNew:'ちょうど頼みたいことがあるんだ。時間があれば、依頼を見ておくれ。',\n  questAccept:'ちょうど困ってたんだ。うちのみかんより強い果物、見つけたら教えておくれ。',\n  questWrong:'うーん、惜しいねえ。探してるのは、みかんより強い果物なんだ。',\n  questDone:'それだよ、それ！ こんな果物があったとはねえ。助かったよ、ありがとう！',\n  lab:'そういや、あんたみたいに言葉の強さを調べてる人がいたねえ。公園の向こうの研究室、覗いてみたらどうだい？',\n  clear:'異論を覆したんだって？ おめでとう！ またいつでも寄っておくれ。'\n },\n fish:{\n  first:'らっしゃい！ 魚を見るか、勝負するか。どっちにしたって活きのいいのを頼むぜ！',\n  revisit:['おう、また来たな。今日は何で勝負する？','言葉も魚も、眺めてるだけじゃ分からねえ。ぶつけてみるのが一番だ。','今日もいいのが揃ってるぜ。好きなだけ見ていきな！'],\n  wins:['一本取られたな！','二つ続いたか。なかなか活きがいいじゃねえか。','三連勝！ こりゃ流れが来てるな。','四つまで来たか。ここまで来たら最後まで釣り上げてみな！','五連勝！ 完敗だ。今日のあんた、文句なしの大漁だよ！'],\n  draw:'おっと、同じ強さだ！ いい勝負じゃねえか。',\n  lose:'へへ、今回はこっちが一枚上手だったな。',\n  questNew:'おう、ひとつ頼みがあるんだ。依頼の方も見ていってくれ！',\n  questAccept:'「さかな」と同じ強さの言葉を探してんだ。魚じゃなくたって構わねえ。頼めるか？',\n  questWrong:'惜しい！ 強すぎても弱すぎても違うんだ。同じ強さを探してくれ。',\n  questDone:'それだ！ ぴったり同じじゃねえか。よく見つけたな！',\n  lab:'お前さん、ずいぶん言葉を集めたな。研究室の先生んとこ行ってみな。変な機械で強さを比べてるぜ。',\n  clear:'異論にも勝ったって？ やるじゃねえか！ 次の勝負も楽しみにしてるぜ。'\n },\n animal:{\n  first:'こんにちは。動物たちに会いに来たの？ よかったら、言葉の勝負もしていかない？',\n  revisit:['また来てくれたんだ。あの子たちも覚えてるみたい。','今日はみんな静かだね。……勝負には、ちょうどいいかも。','ゆっくりしていってね。あの子たちも嬉しそう。'],\n  wins:['ふふ、まず一勝。いい調子だね。','二連勝。動物たちも気になって見てるよ。','三つ続いたね。ちょっと驚いてきたかも。','四連勝。あと一つ……がんばって。','五連勝、おめでとう。みんなも嬉しそう。……私もね。'],\n  draw:'同じ強さだったね。ふふ、仲良しみたい。',\n  lose:'今回は私の勝ち。また遊びに来てね。',\n  questNew:'探している子がいるの。よかったら、依頼を見てもらえる？',\n  questAccept:'きつねより弱い言葉になる動物を探してるの。見つけたら、教えてくれる？',\n  questWrong:'まだ条件に合わないみたい。きつねより弱い動物を、一緒に探してみようか。',\n  questDone:'この子ならぴったり。見つけてくれてありがとう。',\n  lab:'そうだ。研究室の先生なら、集めた言葉を比べてくれるかも。公園の向こうにいるよ。',\n  clear:'異論を覆せたんだね。おめでとう。あの子たちにも話しておくね。'\n },\n goods:{\n  first:'いらっしゃい。日用品から言葉の勝負まで、だいたい揃ってるよ。何にする？',\n  revisit:['また来たね。今日は何をお求めで？','図鑑の品揃え、増えてきたみたいだね。','急がなくていいよ。ゆっくり選ぶのも買い物のうちさ。'],\n  wins:['一勝。お買い上げ……じゃないな。君の勝ちだ。','二連勝。なかなか売れ行きがいい。','三つ続いたか。これは人気商品になりそうだ。','四連勝。あと一つ分、在庫はある？','五連勝。参ったな。こっちの勝ち目は品切れみたいだ。'],\n  draw:'同じ強さか。こちら、交換ということでどうだい。',\n  lose:'今回は返品ってことで。また持ってきてよ。',\n  questNew:'仕入れを手伝ってほしいんだ。新しい依頼、見てみる？',\n  questAccept:'この「はかり」の、ちょうど二倍の強さを持つ道具を探してるんだ。仕入れを手伝ってくれる？',\n  questWrong:'惜しい。探しているのは、はかりのちょうど二倍の道具なんだ。',\n  questDone:'これだ。ちょうど二倍。こんな都合のいい品、本当にあるんだね。',\n  lab:'それだけ品が揃ったなら、研究室に持ち込む頃合いだね。言葉を比べる装置があるらしいよ。',\n  clear:'異論を覆したそうだね。お祝いの言葉も取り扱ってるよ。おめでとう。'\n },\n print:{\n  first:'……言葉を作りに来たのか。二文字あれば、いろいろ作れる。試してみるか？',\n  revisit:['また来たか。……始めよう。','活字は逃げない。ゆっくり組め。','材料はある。好きに組んでみろ。'],\n  wins:['……一本。悪くない。','二つ続いたな。','三連勝。形が見えてきた。','四つ。あと一つで、きれいに刷り上がる。','五連勝。……いい仕上がりだ。文句はない。'],\n  draw:'同じ強さか。……揃ったな。',\n  lose:'今回は、版がずれたな。組み直せばいい。',\n  questNew:'頼みたい仕事がある。依頼を見てくれ。',\n  questAccept:'「れい」を含む言葉を一つ組んでくれ。きれいより強く、れいわより弱いものだ。',\n  questWrong:'違うな。条件が一つ、噛み合っていない。',\n  questDone:'……それだ。きれいに収まった。助かった。',\n  lab:'……材料は揃ったな。研究室へ行け。あの学者なら、並べて見せてくれる。',\n  clear:'異論を覆したか。……いい仕上がりだ。'\n }\n};\nconst randaReaction={WIN:'へえ、僕の負けか。……じゃあ、「異論」にも会ってみる？',DRAW:'同じか。ふふ、こういうこともあるんだね。',LOSE:'そっか。まだ僕の勝ちだ。もっといろんな言葉、見てくるといいよ。'};\nconst scholarLines={first:'ようこそ。話は聞いているよ。君、ずいぶん面白い勝負をしているそうじゃないか。',normal:'今日は何を観測しようか。二つの言葉を並べて、君の気になることを調べてみよう。',compare:'なるほど。二つを並べるだけでも、見えるものは増える。',quests:'面白い傾向が出てきたね。このくらい分かれば、街の人たちの頼み事にも役立つかもしれない。',analysis:'十分なデータが集まった。これなら、強さそのものを数値として解析できそうだ。',equal:'同じ値か。違う言葉でも、同じ強さになる。これは覚えておくといい。',clear:'異論を覆したのか。観測した法則を、自分の言葉で証明したわけだね。'};\nif(!state.town||typeof state.town!=='object')state.town={};\nconst town=state.town;\ntown.residents=town.residents||{};\nif(typeof town.labSeen!=='boolean')town.labSeen=state.screen==='lab'||state.compared.length>0||state.examined.length>0;\nif(typeof town.labEventPending!=='boolean')town.labEventPending=false;\ntown.scholarSpeech=town.scholarSpeech||scholarLines.normal;\ntown.scholarNotices=town.scholarNotices||[];\nfunction residentMemory(id){return town.residents[id]||(town.residents[id]={visits:0,questSeen:false,questFeedback:null,newQuest:false});}\nfunction enterPlace(id){\n const p=person(id);if(!p)return;\n const m=residentMemory(id);m.visits++;\n m.newQuest=!done(id)&&availableQuests()>=questLevel(p)&&!m.questSeen;\n if(m.newQuest)m.questSeen=true;\n state.uiPlace=id;state.screen='place';persist();render();\n}\nfunction residentGreeting(p){\n const d=townDialogue[p.id],m=residentMemory(p.id),n=state.winsBy[p.id];\n if(m.newQuest)return d.questNew;\n if(state.cleared)return d.clear;\n if(m.questFeedback==='done')return d.questDone;\n if(n>=5)return d.wins[4];\n if(n>=2)return d.wins[Math.min(4,n-1)];\n if(m.visits<=1)return d.first;\n return d.revisit[(m.visits-2)%d.revisit.length];\n}\nfunction npcBubble(name,line,extra=''){return `<div class=\"shop-dialogue npc-reaction ${extra}\"><div class=\"shop-dialogue__name\">${escape(name)}</div><p>「${escape(line)}」</p></div>`;}\nfunction resultReaction(p){\n if(p.kind==='randomizer')return npcBubble('ランダ・マイザ',randaReaction[p.outcome]||randaReaction.LOSE);\n if(p.kind!=='explore')return '';\n const place=person(p.place),d=townDialogue[p.place];if(!place||!d)return '';\n const n=state.winsBy[p.place];\n const line=p.outcome==='WIN'?d.wins[Math.min(4,Math.max(0,n-1))]:p.outcome==='DRAW'?d.draw:d.lose;\n return npcBubble(place.person,line);\n}\nfunction labUnlockNotice(p){\n if(!town.labEventPending||p.kind!=='explore')return '';\n const place=person(p.place),d=townDialogue[p.place];\n return `<aside class=\"panel town-unlock\" role=\"status\">${cap('NEW AREA')}<h2>研究室が解放されました！</h2><p>公園の向こうにある研究室で、見つけた言葉を比べられます。</p>${npcBubble(place.person,d.lab)}<p class=\"rpg-footnote\">研究は任意です。異論にはいつでも挑戦できます。</p></aside>`;\n}\nfunction openTownLab(){\n const first=!town.labSeen;town.labSeen=true;town.labEventPending=false;\n town.scholarSpeech=state.cleared?scholarLines.clear:first?scholarLines.first:scholarLines.normal;\n town.scholarNotices=[];state.screen='lab';persist();render();\n}\nfunction scholarDialogue(){\n return npcBubble('学者',state.cleared&&town.scholarSpeech===scholarLines.normal?scholarLines.clear:town.scholarSpeech)+\n town.scholarNotices.map(n=>`<p class=\"town-milestone\" role=\"status\">${escape(n)}</p>`).join('');\n}\nfunction compareTownWords(){\n const x=$('#lab-left').value,y=$('#lab-right').value;\n if(!x||!y||x===y){toast('異なる二つの言葉を選んでください。');return;}\n const before=state.compared.length,key=[x,y].sort().join('|');\n if(!state.compared.includes(key))state.compared.push(key);\n state.labComparison={a:x,b:y,result:outcome(y,x)};\n const equal=state.labComparison.result==='DRAW'&&!town.equalSeen;\n if(equal)town.equalSeen=true;\n town.scholarSpeech=equal?scholarLines.equal:scholarLines.compare;\n town.scholarNotices=[];\n if(before<2&&state.compared.length>=2){town.scholarNotices.push('新しい依頼が解放されました。各施設で依頼を見られます。');town.scholarSpeech=scholarLines.quests;}\n if(before<6&&state.compared.length>=6){town.scholarNotices.push('数値解析と新しい依頼が解放されました。');town.scholarSpeech=scholarLines.analysis;}\n if(equal&&town.scholarNotices.length)town.scholarNotices.push('違う言葉でも、同じ強さになる組み合わせを発見しました。');\n persist();render();\n}\nfunction submitTownQuest(){\n const p=person(state.uiPlace),w=$('#quest-word')?.value;if(!p)return;\n if(!w){toast('回答する言葉を選んでください。');return;}\n const m=residentMemory(p.id);\n if(questCandidates(p.quest,w)){\n  if(!done(p.id))state.questDone.push(p.id);\n  m.questFeedback='done';m.newQuest=false;persist();render();toast('依頼達成！ '+p.person+'から感謝された。');\n }else{m.questFeedback='wrong';persist();render();const select=$('#quest-word');if(select)select.value=w;toast('条件を満たしていないようだ。別の言葉を探してみよう。');}\n}\nfunction questDialogue(p){const m=residentMemory(p.id),d=townDialogue[p.id];return npcBubble(p.person,done(p.id)?d.questDone:m.questFeedback==='wrong'?d.questWrong:d.questAccept);}\n\nfunction render(){if(state.screen!=='result'&&town.labEventPending){town.labEventPending=false;persist();}"
  ],
  [
    "<div class=\"rpg-mini-stats\"><strong>★ ${state.stars.length}/5</strong><span>街の星あつめ</span></div>",
    ""
  ],
  [
    "${lab?'研究室':'？？？'}</span></button>",
    "${lab?'研究室':'？？？'}</span>${lab&&!town.labSeen?'<small class=\"town-new\">NEW!</small>':''}</button>"
  ],
  [
    "ちょっと待って。5人とも倒したんだ。<br>じゃあ、次は僕とも遊ぼうよ。",
    "へえ。5人全員に勝ったんだ。<br>じゃあ、次は僕とも遊ぼうよ。"
  ],
  [
    "line:'ちょっと待って。5人とも倒したんだ。じゃあ、次は僕とも遊ぼうよ。'",
    "line:'へえ。5人全員に勝ったんだ。じゃあ、次は僕とも遊ぼうよ。'"
  ],
  [
    "「${escape(p.line)}」",
    "「${escape(residentGreeting(p))}」"
  ],
  [
    "const line=q.line||place?.line||'';",
    "const line=q.line||(place?residentGreeting(place):'');"
  ],
  [
    "if(state.visited.length>=3&&!state.labUnlocked)state.labUnlocked=true;",
    "if(state.visited.length>=3&&!state.labUnlocked){state.labUnlocked=true;town.labEventPending=true;}"
  ],
  [
    "${boss&&outcomeLabel==='DRAW'?`<p class=\"timer-inline\">",
    "${resultReaction(p)}${labUnlockNotice(p)}${boss&&outcomeLabel==='DRAW'?`<p class=\"timer-inline\">"
  ],
  [
    " : p.kind==='randomizer'?({WIN:'へえ、僕の負けか。それなら、異論にも挑んでみる？',DRAW:'引き分けか。……面白いね。ほかの人たちとも戦ってみたら？',LOSE:'残念。僕の勝ちだね。この先には、僕よりも強い相手がいるよ。'}[outcomeLabel])",
    " : p.kind==='randomizer'?({WIN:'見事な勝利。',DRAW:'互角の勝負だった。',LOSE:'新しい結果が、次の手掛かりになる。'}[outcomeLabel])"
  ],
  [
    "<p>「この装置を使えば、君が見つけた言葉同士の強さを比較できる。何を調べるかは君の自由だ。」</p>",
    "${scholarDialogue()}"
  ],
  [
    "<h3>${p.person}の依頼</h3><p>「${q.text}」</p>",
    "<h3>${p.person}の依頼</h3><p>条件：${escape(q.text)}</p>${questDialogue(p)}"
  ],
  [
    "function enterMap(){if(!state.labUnlocked&&state.visited.length>=3)state.labUnlocked=true;state.screen='map';state.notice=null;persist();render();}",
    "function enterMap(){if(!state.labUnlocked&&state.visited.length>=3)state.labUnlocked=true;town.labEventPending=false;state.screen='map';state.notice=null;persist();render();}"
  ],
  [
    "else if(a==='place'){state.uiPlace=id||state.uiPlace;state.screen='place';persist();render();}",
    "else if(a==='place')enterPlace(id||state.uiPlace);"
  ],
  [
    "else if(a==='next-explore'){state.notice=null;startQuestion(state.lastPlace);}",
    "else if(a==='next-explore'){town.labEventPending=false;state.notice=null;startQuestion(state.lastPlace);}"
  ],
  [
    "else if(a==='lab-gate'){if(state.labUnlocked||state.cleared){state.screen='lab';persist();render();}else toast('まだ行き方が分からない。各地を巡ってみよう。');}",
    "else if(a==='lab-gate'){if(state.labUnlocked||state.cleared)openTownLab();else toast('まだ行き方が分からない。各地を巡ってみよう。');}"
  ],
  [
    "else if(a==='quest-open'){state.uiPlace=id;state.screen='quests';persist();render();}",
    "else if(a==='quest-open'){state.uiPlace=id;const m=residentMemory(id);m.newQuest=false;if(m.questFeedback!=='done')m.questFeedback=null;state.screen='quests';persist();render();}"
  ],
  [
    "else if(a==='explore-intro'){checkHintOffer();state.screen='story';state.notice='explore';persist();render();}",
    "else if(a==='explore-intro'){checkHintOffer();if(state.pending?.who==='異論'&&state.bossAttempts>=2){enterMap();}else{state.screen='story';state.notice='explore';persist();render();}}"
  ],
  [
    " else if(a==='submit-quest'){const p=person(state.uiPlace),w=$('#quest-word')?.value;if(!w){toast('回答する言葉を選んでください。');return;}if(questCandidates(p.quest,w)){if(!done(p.id))state.questDone.push(p.id);persist();toast('依頼達成！ '+p.person+'から感謝された。');render();}else toast('条件を満たしていないようだ。別の言葉を探してみよう。');}",
    " else if(a==='submit-quest')submitTownQuest();"
  ],
  [
    " else if(a==='compare'){const x=$('#lab-left').value,y=$('#lab-right').value;if(!x||!y||x===y){toast('異なる二つの言葉を選んでください。');return;}let before=state.compared.length;const key=[x,y].sort().join('|');if(!state.compared.includes(key))state.compared.push(key);state.labComparison={a:x,b:y,result:outcome(y,x)};persist();render();if(before<2&&state.compared.length>=2)toast('初級サブクエストが解放されました。');if(before<6&&state.compared.length>=6)toast('数値解析と上級サブクエストが解放されました。');}",
    " else if(a==='compare')compareTownWords();"
  ],
  [
    "</head>",
    "<style id=\"v18-town-conversations\">\n.town-map--lived .town-spot--lab{left:59%!important;top:26%!important;}\n.town-map--lived .town-spot--animal{left:81%!important;top:77%!important;}\n@media(max-width:700px){\n .town-map--lived .town-spot--lab{left:53%!important;top:27%!important;}\n .town-map--lived .town-spot--animal{left:79%!important;top:65%!important;}\n}\n.pixel-lab-scene>.pixel-character{left:50%;transform:translateX(-50%)!important;animation:none!important;}\n.npc-reaction{width:min(620px,100%);margin:20px auto 26px;text-align:left;}\n.npc-reaction p{overflow-wrap:anywhere;}\n.town-unlock{width:min(660px,100%);text-align:left;}\n.town-unlock h2{font-size:clamp(20px,4vw,27px);line-height:1.6;}\n.town-unlock .npc-reaction{margin-top:26px;}\n.town-new{color:#fff8e8!important;background:#678355!important;padding:3px 7px;border-radius:4px;}\n.town-milestone{padding:12px 15px;background:#e2efd9;border:2px solid #93a780;border-radius:7px;color:#44673e!important;font-weight:800;line-height:1.8;}\n.outcome-view .npc-reaction p{color:#625346;}\n</style></head>"
  ]
];
for(const [before,after]of changes){if(html.split(before).length!==2)throw new Error('V18 upgrade marker missing or duplicated: '+before.slice(0,80));html=html.replace(before,()=>after);}

// V18 discovery: keep the underlying rule out of feature names.
const discoveryChanges=[
  [
    "if(state.visited.length>=3&&!state.labUnlocked){state.labUnlocked=true;town.labEventPending=true;}",
    "if(facilityBattleCount()>=4&&!state.labUnlocked){state.labUnlocked=true;town.labEventPending=true;}"
  ],
  [
    "if(!state.labUnlocked&&state.visited.length>=3)state.labUnlocked=true;",
    "if(!state.labUnlocked&&facilityBattleCount()>=4)state.labUnlocked=true;"
  ],
  [
    "const town=state.town;",
    "const town=state.town;\nfunction facilityBattleCount(){return state.history.filter(h=>cfg.places.some(p=>p.person===h.who)).length;}\n// Existing saves keep all earned unlocks; historical resident battles count immediately.\nif(!state.labUnlocked&&facilityBattleCount()>=4){state.labUnlocked=true;town.labEventPending=true;}\nfunction researchUnlockView(){\n const level=availableQuests();\n if(!level)return `<aside class=\"panel research-quests\"><h2>街の人たちからの依頼</h2><p>異なる2組の言葉を比較すると、住人からの依頼が届きます。</p></aside>`;\n const fresh=town.scholarNotices.length>0;\n const places=cfg.places.filter(p=>questLevel(p)<=level&&!done(p.id));\n return `<aside class=\"panel research-quests ${fresh?'research-quests--new':''}\" role=\"status\">${cap(fresh?'NEW · SIDE QUEST':'SIDE QUEST')}<h2>${fresh?'新しい依頼が届きました！':'街の人たちからの依頼'}</h2><p>${level===1?'八百屋・魚屋・動物園の依頼が解放されました。':'全施設の依頼が解放されました。'} 施設に戻って「依頼を見る」から受けられます。</p><div class=\"research-quest-links\">${places.map(p=>btn('quest-open',p.name+'の依頼を見る ↗','button--primary','data-id=\"'+p.id+'\"')).join('')||'<p>すべての依頼を達成しました！</p>'}</div></aside>`;\n}\nfunction postClearDiscovery(){\n if(state.questDone.length||state.stars.length||Object.values(state.winsBy).some(n=>n>=2)||state.history.some((h,i,a)=>i>0&&h.outcome==='WIN'&&a[i-1].outcome==='WIN'&&h.who===a[i-1].who&&cfg.places.some(p=>p.person===h.who)))return '';\n return `<aside class=\"panel post-clear-discovery\"><h2>ことばの街には、まだ続きがある。</h2><p>街の人たちは、勝負のほかにも頼みたいことがあるようです。研究室や施設を訪ねてみると、新しい一面が見えるかもしれません。</p><p>同じ相手に続けて勝てたら、何かいいこともあるのだとか。異論を覆したその言葉で、もう少し街を歩いてみませんか。</p>${btn('map','街の人たちに会いに行く ↗','button--primary')}</aside>`;\n}"
  ],
  [
    "${scholarDialogue()}",
    "${researchUnlockView()}${scholarDialogue()}"
  ],
  [
    "persist();render();\n}\nfunction submitTownQuest",
    "persist();render();\n if(town.scholarNotices.length){document.querySelector('.research-quests')?.scrollIntoView({block:'center',behavior:'smooth'});}\n}\nfunction submitTownQuest"
  ],
  [
    "<div class=\"share-preview\">${escape(shareText())",
    "${postClearDiscovery()}<div class=\"share-preview\">${escape(shareText())"
  ],
  [
    "<div class=\"pixel-intro__foot\"><p>",
    "<div class=\"pixel-intro__foot\"><p class=\"trial-note\">トライ＆エラー推奨。負けも引き分けも、次のひらめきの手掛かりに。</p><p>"
  ],
  [
    "<div class=\"rules-prose\"><p>",
    "<div class=\"rules-prose\"><p class=\"trial-note\">トライ＆エラー推奨。気になる言葉を試して、勝ち・負け・引き分けから手掛かりを集めよう。</p><p>"
  ],
  [
    "まだ行き方が分からない。各地を巡ってみよう。",
    "街の住人とあと${Math.max(0,4-facilityBattleCount())}回勝負してみよう。同じ相手との再戦も数えられます。"
  ],
  [
    "toast('街の住人とあと${Math.max(0,4-facilityBattleCount())}回勝負してみよう。同じ相手との再戦も数えられます。')",
    "toast(`街の住人とあと${Math.max(0,4-facilityBattleCount())}回勝負してみよう。同じ相手との再戦も数えられます。`)"
  ]
];
for(const [before,after] of discoveryChanges){if(html.split(before).length!==2)throw new Error('Discovery marker missing or duplicated: '+before.slice(0,80));html=html.replace(before,()=>after);}
const discoveryText=[["全数値表示", "観測ヒント"], ["全単語の数値表示", "観測ヒント"], ["数値解析", "詳細観測"], ["state.compared.length>=6", "state.compared.length>=4"], ["before<6", "before<4"], ["lvl>=6", "lvl>=4"], [" / 6組", " / 4組"], ["異なる6組", "異なる4組"], ["十分なデータが集まった。これなら、強さそのものを数値として解析できそうだ。", "十分な記録が集まった。これなら、一つひとつの言葉を詳しく観測できそうだ。"], ["同じ値か。", "同じ強さか。"], ["登場した言葉が自動で登録されます。数値が表示されるのは解析済みの言葉だけ。", "登場した言葉が自動で登録されます。研究やヒントで、言葉についてさらに詳しく調べられます。"], ["以後、数値が表示されます。", "以後、観測結果が表示されます。"]];
for(const [before,after] of discoveryText)html=html.split(before).join(after);
html=html.replace('</head>',`<style>
.trial-note{font-weight:800;color:#5d754b!important;line-height:1.9;}
.research-quests{margin:22px 0;border:3px solid #79925a;background:#f0f5e4;box-shadow:0 5px 0 #c9d3b5;text-align:left;}
.research-quests h2,.post-clear-discovery h2{font-size:clamp(20px,4vw,27px);line-height:1.6;}
.research-quests--new{animation:research-arrival .55s ease-out;}
.research-quest-links{display:flex;flex-wrap:wrap;gap:12px;margin-top:20px;}
.research-quest-links .button{white-space:normal;}
.post-clear-discovery{margin:28px 0;text-align:left;}
@keyframes research-arrival{from{transform:translateY(12px);opacity:.3}to{transform:translateY(0);opacity:1}}
@media(prefers-reduced-motion:reduce){.research-quests--new{animation:none;}}
</style></head>`);
return html;
};
