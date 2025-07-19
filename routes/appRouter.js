const { Router } = require('express');
const { passport } = require('../db/auth');
const { postSignupUser, postCreateFolder, getDeleteFolderById, postRenameFolder, getFolderById, postSaveFile, getFileFromDb, getDeleteFile } = require('../db/querries');
const router = Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', (req, res) => {
    const userStatus = req.user;
    //console.log('GET /: userStatus:', userStatus);
    res.render('index', {
        userStatus: userStatus
    })
})

router.get('/sign-in', (req, res) => {
    const userStatus = req.user;
    res.render('sign-in', {
        userStatus: userStatus
    });
})

router.post('/sign-in', passport.authenticate("local", {
    successRedirect: '/',
    failureRedirect: '/'
}))

router.get('/sign-up', (req, res) => {
    const userStatus = req.user;
    res.render('sign-up', {
        userStatus: userStatus
    })
})

router.post('/sign-up', async (req, res) => {
    const { firstname, lastname, username, password } = req.body;
    const name = firstname + ' ' + lastname;
    await postSignupUser(name, username, password);
    res.redirect('/sign-in')
})

router.get('/sign-out', (req, res, next) => {
    req.logOut((err) => {
        if(err) return next(err);

        res.redirect('/');
    })
})

router.post('/create-folder', async (req, res) => {
    const { foldername } = req.body;
    const id = req.user.id;
    //console.log('Createfolder userId:', id);
    const newFolder = await postCreateFolder(foldername, id);
    //console.log(newFolder);
    res.redirect('/')
})

router.get('/delete-folder/:id', async (req, res) => {
    const id = req.params.id; 
    await getDeleteFolderById(id);
    console.log('Folder deleted');
    res.redirect('/');
})

router.get('/rename/:id', async(req, res) => {
    const id = req.params.id;
    const folder = await getFolderById(id);
    res.render('rename-folder', {
        folder: folder
    })
})

router.post('/rename/:id', async (req, res) => {
    const id = req.params.id;
    const foldername = req.body.foldername;
    await postRenameFolder(id, foldername);
    res.redirect('/')
})

router.get('/folder-dir/:id', async (req, res) => {
    const id = req.params.id;
    const folder = await getFolderById(id);
    //console.log('dir:',folder);
    res.render('folder-dir', {
        folder: folder
    })
})

router.post('/add-file/:id', upload.single('file'),async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const id = req.params.id;
        const originalName = req.file.originalname;
        const buffer = req.file.buffer;
        const savedFile = await postSaveFile(originalName, buffer, id);
        res.redirect(`/folder-dir/${id}`)
    } catch (error) {
        console.log(error);
    }
})

router.get('/download/:id', async (req, res) => {
    const id = req.params.id;
    const file = await getFileFromDb(id);
    if (!file) {
        return res.status(400).send('No file uploaded.');
    };
    res.setHeader('Content-Disposition', `attachment; filename=${file.filename}`);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(file.data);
})

router.get('/delete-file/:id/:fid', async (req, res) => {
    const id = req.params.id;
    const folderId = req.params.fid;
    await getDeleteFile(id);
    res.redirect(`/folder-dir/${folderId}`);
})

module.exports = router;