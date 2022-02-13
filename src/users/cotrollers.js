const bcrypt = require('bcryptjs');
const pool = require('../../db');
const queries = require('./queries')
const Pool = require('pg').Pool;


const getUsers = async (req, res) => {
    pool.query(queries.getUsers,(error, results) => {
        if(this.error){
            console.log("error:"+error);
            res.status(404).send(error);
            throw error;
        }
        res.status(200).json(results.rows)
    });
};

const getUserById=(req,res) =>{
    const id =parseInt(req.params.id);


    pool.query(queries.getUserById,[id],(error, results)=>{
        if(!results) return res.status(400).send("invalid input")
        if(!results.rows.length){ 
            res.status(404).send('user not found')
            //throw error
        }else{
            res.status(200).json(results.rows);
        }
    } );
};


const addUser = async (req,res) => {
    const {name,email,password,dob} = req.body;
    if(toString(password).length<8){
        res.status(400).send('Your Password should be longer than 7 characters');
    }else{

        const salt=await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        //check if email exists
        pool.query(queries.checkEmailExists, [email], (error, results) => {
            
            if (results.rows.length){
                res.send("email already exists");
                
            }else{
                pool.query(queries.addUser, 
                    [name, email, passwordHash, dob],
                    (error,results)=>{
                    if(error){ 
                        throw error;
                    }else{
                        res.status(201).send("User created successfully");
                    }
                });
            }
        });
    
    }


};

const removeUser = (req, res) =>{
    const id =parseInt(req.params.id);

    pool.query(queries.getUserById,[id],(error, results)=>{
        const noUserfound = !results.rows.length;
        if(noUserfound){
            res.send("User does not exist in the database.");
        }else{
            pool.query(queries.removeUser,[id],(error, results)=>{
                if(error) throw error;
                res.status(200).send("user removed successfully");
        });
        }

        
});

}

const updateUser = async (req,res) =>{
    const id = parseInt(req.params.id);
    const {name } = req.body;
    const {password} = req.body

    
    //this.passwordValidator(password);
    if(password.length<8){
        res.status(400).send('Your Password should be longer than 7 characters');
    }else{
        const salt=await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        pool.query(queries.getUserById,[id],(error, results)=>{
            const noUserfound = !results.rows.length;
            if(noUserfound){
                res.send("User does not exist in the database.");
            }else{
            
    
            pool.query(queries.updateUser,[name, passwordHash,id],(error,results) =>{
                if (error) throw error;
                res.status(200).send("User updated successfully")
            });
            }
        });
    }

    
}

const userLogin =(req,res) =>{
    const {email} = req.body;
    const {password} = req.body;
   
    
    
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (!results.rows.length){
            res.status(404).send("email does not exist in the database");
        }else{

        pool.query(queries.getPasswordByEmail,[email],(error,results)=>{
            const queryPassword= bcrypt.compareSync(password, results.rows[0].password);
            if(!queryPassword){
                res.send("Invalid password");
            }else{
                res.status(200).json(results.rows);
                console.log(queryPassword)
            }
            
            //console.log(results)
        });  
    }
    })    
}
 
//R


const passwordValidator=(password)=>{
    if(toSting(password).length<8){
        // res.status(400).send('Your Password should be longer than 7 characters');
        return false;
    }
};
module.exports ={
    getUsers,
    getUserById,
    addUser,
    removeUser,
    updateUser,
    userLogin,
  
};