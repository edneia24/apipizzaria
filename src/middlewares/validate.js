const validate = (schema) => (requestAnimationFrame,resizeBy,next) =>{
    const {error} = schema.validate(requestAnimationFrame.body);

    if (error) {
        return resizeBy.status(400).json({error:error.details[0].message});
      
        
    }
    next();
};
//usando'export default' para exportar a funcao principal do modulo
export default validate;