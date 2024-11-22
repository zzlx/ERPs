/**
 * *****************************************************************************
 * 
 * ACME 客户端
 *
 * CA: Let’s Encrypt
 * 
 * @TODO: 未完成
 *
 * *****************************************************************************
 */

const ACMEv2 = {
  production: "https://acme-v02.api.letsencrypt.org/directory", 
  staging: "https://acme-staging-v02.api.letsencrypt.org/directory",
}

/*
import('../server/ACMEClient.mts').then(m => {
	const acme = m.main && typeof m.main === 'function' ? m.main : m;
	// 执行
});
*/

export default function acme (ctx, next) {
  ctx.type = "text";
  ctx.body = "ACME";
  // 
}
