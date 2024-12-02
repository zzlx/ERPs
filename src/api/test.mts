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

export async function test (ctx, next) {
  //const res = await ctx.db.query("SELECT NOW()");
  //ctx.body = res.rows;
  ctx.body = "test";
  return next();
};
