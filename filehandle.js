/* 
 * File handling done here:
 * 
 */


var FS;
var filename="settings.ini";
var file_entry ;
var file_text="empty";


function setFileName(fname) {
    filename = fname;
}

function fileSystemInit() {
 
//i made the filesize 100kb....?
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024 * 100, gotFSSuccess, failed("in init"));
}


function gotFSSuccess(filesystem) {
    
    FS = filesystem;
    alert("Got the filesystem");
    FS.root.getFile(filename,{create : true},gotFileEntry,failed("in gotFSSuccess"));
}

function gotFileEntry(thefileentry) {
    file_entry = thefileentry;
    //thefileentry.file(gotFile,failed);
}

/*Reading the file here*/

function readFromFile() {
    file_entry.file(fileReaderSuccess,failed("in readFile"));
}

function fileReaderSuccess(file) {
    var reader = new FileReader();
    reader.onloadend = function(e) {
    
     file_text = e.target.result;
     alert(file_text);
    };
    reader.onloaderror = function(e) {
    failed("in onloaderror");
  };
  
  reader.readAsText(file);
  
  
}

/*Writing the file here*/


function writeToFile() {
    file_entry.createWriter(fileWriterSuccess, failed("in writeFile"));
}

function fileWriterSuccess(writer) {
    writer.onwrite = function(e) {
alert("Write Completed");
  };
    writer.write(file_text);
    
}



function gotFile(thefile) {
    /*var reader = new FileReader();
    reader.readAsText(file);*/
    file = thefile;
}


function failed(message) {
    
    alert("failed.."+message);
}

