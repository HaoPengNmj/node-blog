module.exports = (ctx, name, data) => {
    ctx.cookies.set(name, data, {
        domain: "localhost",
        path: "/",
        maxAge: 36e5,
        httpOnly: true, // true 不让客户端能访问这个 cookie
        overwrite: false
    })
}