const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function getUser(username) {
    const user = await prisma.users.findUnique({
        where: {
            email: username
        }
    })
    //console.log('user:', user);
    return user;
}

async function getUserThroughId(id) {
    const user = await prisma.users.findUnique({
        where: {
            id: id
        },
        include: {
            folders: true
        }
    })
    return user
}

async function postSignupUser(name, username, password){
    try {
        const existingUser = await prisma.users.findUnique({
            where: { email: username },
        });
        if (existingUser) {
            console.log('User already exists');
            return { error: 'User already exists' };
        }
        //Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        //Create User
        const newUser = await prisma.users.create({
            data: {
                name: name,
                email: username,
                password: hashedPassword
            }
        });
        console.log('User created :', newUser)
    } catch (error) {
        console.error('Error creating user:', error.message);
        return { error: error.message };
    }
}

async function postCreateFolder(foldername, userId) {
    const newFolder = await prisma.folder.create({
        data: {
            name: foldername,
            user: {
                connect: {
                    id: userId
                }
            }
        }
    });
    console.log('Folder created:', newFolder);
    return newFolder;
}

async function getDeleteFolderById(id) {
    await prisma.file.deleteMany({
        where: {
            folderId: id
        }
    });
    
    await prisma.folder.delete({
        where: {
            id: id
        }
    })
}

async function getFolderById(id) {
    return await prisma.folder.findUnique({
        where: {
            id: id
        },
        include: {
            files: true
        }
    })
}

async function postRenameFolder(id, foldername) {
    const updatedFolder = await prisma.folder.update({
        where: {
            id: id,
        },
        data: {
            name: foldername
        }
    });
    return updatedFolder
}

async function postSaveFile(originalname, buffer, id) {
    const savedFile = await prisma.file.create({
        data: {
            filename: originalname,
            data: buffer,
            folder: {
                connect: {
                    id: id
                }
            }
        },

    });
    console.log('File saved');
}

async function getFileFromDb(id) {
    const file = await prisma.file.findUnique({
        where: {
            id: id
        }
    });
    //console.log('Querry file:', file);
    return file;
}

async function getDeleteFile(id) {
    await prisma.file.delete({
        where: {
            id: id
        }
    })
}

module.exports = {
    getUser,
    getUserThroughId,
    postSignupUser,
    postCreateFolder,
    getDeleteFolderById,
    getFolderById,
    postRenameFolder,
    postSaveFile,
    getFileFromDb,
    getDeleteFile
}