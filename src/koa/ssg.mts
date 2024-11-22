/**
 * *****************************************************************************
 * 
 * Static Site Generation:SSR
 *
 * 最佳网页渲染实践:
 *
 * 客户端渲染，一般的做法是在 useEffect 中请求服务端数据再渲染组件，该动作在页面基本静态文件加载完毕后执行.
 * 增量静态生成，使用ISR，可以在运行时实现静态页面生成，而无需重新构建整个网站。
 * 只需在 getStaticProps 中添加属性 revalidate，该动作在用户发起页面请求时执行.
 *
 * 
 * > 渲染方式：
 * >
 * > SSR:Server-side Rendering 
 * > SSG:Static-side Generation
 * > CSR:Client-side Rendering
 * > ISR:Incremental Static Regeneration
 * 
 * *****************************************************************************
 */

