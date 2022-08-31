try {

    // Grab the array of uploaded mp3 files
    await UploadMiddleware(req, res)
    const files = req.files as Express.Multer.File[] 

    // Loop through each of the uploaded mp3's and extract the metadata and save to an array
    const songs = []
    let albumComment = ''
    for(let i = 0; i < files.length; i++){
        const mp3Bytes = fs.readFileSync(files[i].path)

        // Album is a string here but will be replaced with an ObjectId reference later
        const {
            title, artist, album, disc_number, track_number, duration, genre, release_year, comment, album_art
        } = await getID3Tags(mp3Bytes)

        albumComment = comment

        const song_tags = {
            title, artist, album, disc_number, track_number, duration, genre, release_year, comment, album_art,
            path: files[i].path
        }

        songs.push(song_tags)
    }

    // Convert the album_art data array to a buffer and then to an image and save to disk
    const data = songs[0].album_art
    const buffer = Buffer.from(data)
    fs.writeFileSync(`${process.env.MEDIA}/${req.body.title}/album_art.jpg`, buffer, 'binary');

    // Create the album if it does not already exist
    let album = await AlbumModel.findOne({ artist: songs[0].artist, title: songs[0].album})
    if (!album) {
        album = await AlbumModel.create({
            title: songs[0].album, 
            artist: songs[0].artist, 
            genre: songs[0].genre, 
            path: `${process.env.MEDIA}/${req.body.title}`,
            release_year: songs[0].release_year,
            comment: songs[0].comment
        })
        console.log(`${songs[0].album} was created`)
    }

    // Loop through the metadata and create a song model, replace the album string with an ObjectId reference
    for await (const song of songs) {
        SongModel.create({
            ...song,
            album: album
        })
    }

    res.status(200).json(songs)       
    
} catch (err) {
    next(err)
}