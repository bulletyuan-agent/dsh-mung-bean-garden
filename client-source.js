// Source template. Run `node build.mjs` after changing this file, garden-ui.js or garden.css.
window.__ModuleLoader__.load({
  id: '@bulletyuan-agent/dsh-mung-bean-garden',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    /* INLINE_GARDEN_UI */
    const css = /* INLINE_GARDEN_CSS */;
    return {
      inject: ['slots','locale','connection'],
      apply(ctx) {
        const connection=ctx.get('connection');
        if(!connection?.rpc?.call)throw new Error('豆的一生需要 DSH 桌面连接服务');
        const lifetime=new AbortController();
        ctx.effect(()=>()=>lifetime.abort());
        for(const [language,dict] of Object.entries({...UI_STRINGS,zh:UI_STRINGS['zh-CN']}))ctx.effect(()=>ctx.locale.register('mung-bean',language,dict));
        const Garden=createGarden(React);
        const api=async args=>{
          const result=await connection.rpc.call('/api','mung-bean/execute',args,lifetime.signal);
          if(!result.ok)throw new Error(result.error?.message || '游戏请求失败');
          return result.value;
        };
        // Exercise the real page's carrier at activation, including dsh-app desktop.
        api({action:'state'}).catch(error=>console.error('[mung-bean] Host connection:',error.message));
        const t=ctx.locale.bind('mung-bean');
        function Panel() {
          React.useSyncExternalStore(fn=>ctx.locale.subscribe(fn),()=>ctx.locale.getSnapshot());
          return h('section',{style:{height:'100%',minHeight:0,overflow:'auto',background:'var(--dsw-alias-bg-base)',color:'var(--dsw-alias-label-primary)'}},h('style',null,css),h(Garden,{api,t,visitorMode:false}));
        }
        function Icon({size=20}) {return h('svg',{width:size,height:size,viewBox:'0 0 32 32',fill:'none',stroke:'currentColor',strokeWidth:1.6,'aria-hidden':true},h('path',{d:'M10 11C4 13 5 24 13 26C22 29 29 16 23 10C20 7 14 8 10 11Z'}),h('path',{d:'M16 9C13 3 20 2 23 3C23 7 20 9 16 9ZM13 16v2m7-2v2m-6 3q3 3 5-1',strokeLinecap:'round'}));}
        ctx.slots.inject('main',()=>ctx.slots.register({name:'main',key:'mung-bean'},Panel));
        ctx.slots.inject('sidebar.panellist',()=>ctx.slots.register({name:'sidebar.panellist',id:'mung-bean',order:15,label:()=>ctx.locale.getLocale().active.startsWith('zh')?'豆的一生':'Bean Garden'},Icon));
      }
    };
  }
});
