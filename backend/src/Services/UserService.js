const User = require("../app/model/User")


const getAllUser = () => {
    return new Promise( async (resolve, reject) => {
        try {
            const allUser = await User.find()
            resolve({
                status: 'Success',
                message: 'Successful request',
                data: allUser
            })
        }catch (err){
            reject({
                status: 'Error',
                message: 'Failed to get user',
                error: err
            })
        }
    })
}

const getDetailUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            })
            if (user === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: user
            })
        }catch (err) {
            reject({
                status: 'Error',
                message: 'Failed to delete User',
                error: err
            })
        }
    })
}

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(id, data)
            const checkUser = await User.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }

            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true })
            const { password, ...other} = updatedUser._doc
            console.log(other)
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: other
            })
        } catch (err) {
            reject({
                status: 'Error',
                message: 'Failed to delete User',
                error: err
            })
        }
    })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkDeleteUser = await User.findOne({_id: id});
            if (!checkDeleteUser) {
                return reject({
                    status: 'Error',
                    message: 'No User found',
                })
            }
            await User.findOneAndDelete({_id: id})
             resolve({
                status: 'OK',
                message: 'Delete Success',
            })
        }catch (err) {
            reject({
                status: 'Error',
                message: 'Failed to delete User',
                error: err
            })
        }
    })
}

module.exports = {
    getAllUser,
    deleteUser,
    getDetailUser,
    updateUser
}