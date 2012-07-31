/* 
 * File handling done here:
 * 
 */


var FS;


function init(LocalFileSystem.PERSISTENT) {
 

  window.requestFileSystem(fileSystemType, 1024 * 100, success, onFileError);
}


function success(filesystem) {
    
    FS = filesystem;
    alert("Got the filesystem");
}