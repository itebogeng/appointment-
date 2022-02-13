//user queries
const getUsers = "SELECT id, name, email, dob, password FROM users ORDER BY id ASC";
const getUserById = "SELECT * FROM users WHERE id =$1"
const checkEmailExists = "SELECT * FROM users WHERE email= $1"
const addUser = "INSERT INTO users (name,email,password,dob) VALUES ($1,$2,$3,$4)";
const removeUser ="DELETE FROM users WHERE id=$1";
const updateUser ="UPDATE users SET name=$1, password=$2 WHERE ID = $3"
const userLogin = "SELECT id, name, email, dob FROM users WHERE password=$1 AND email=$2";
const getPasswordByEmail="SELECT * FROM USERS WHERE email=$1"




module.exports = {
    //user queries
    getUsers,
    getUserById,
    checkEmailExists,
    addUser,
    removeUser,
    updateUser,
    userLogin,
    getPasswordByEmail,
   


};