/**
 * *****************************************************************************
 * 
 * test
 *
 * *****************************************************************************
 */

// get users from db
const users =  {
  1: "zhang",
  2: "wang",
  3: "li",
  4: "zhao"
};

export default async function (ctx, next) {
  const res = await ctx.db.query("SELECT NOW()");
  ctx.body = res.rows;
  return next();
};
