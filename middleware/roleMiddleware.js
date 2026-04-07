exports.authorizeRoles = (...roles) => {
return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(401).send({message: 'Access denied for role: $(req.user.role}'
        });
    }
    next();
}
}