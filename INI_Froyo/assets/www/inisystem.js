/* 
 * File handling done here:
 * 
 */

var theini;
var FS;
var filename="settings.ini";
var file_entry ;
var file_text="empty";



function Ini(contents){
	//alert('ini created');
        this.sections = new Array();
        
        this.prse = function (content,inis) {
		parse(content,inis);
	}
        parse = function (content,inis) {
            var i, ln, m, key, val,  prop = '',
            lines = contents.split(/\r\n|\r|\n/);
//alert("parsing");
        
	var index =-1;
	    
        for (i=0; i<lines.length; i++) {
           
            // First we trim the line
            ln = lines[i].replace(/^\s+/,'').replace(/\s+$/,'');

            // Register empty lines
            if (ln.length === 0) {
                //sect.line();
                continue;
            }

            // Detect whole line comments
            if (ln.charAt(0) === '#' || ln.charAt(0) === ';') {
                //sect.comment(ln.substr(1).replace(/^\s+/,''));
                continue;
            }

            // Detect section header
            if (ln.charAt(0) === '[') {
                // TODO: Detect malformed sections
                ln.replace(/^\s*\[\s*([^\s\]"]+)(\s+"([^"]+))?/, function(m0,m1,m2,m3){
			
			
			
			
                        
                        inis.push(new Section(m1));
                        index++;
                        //alert(inis[0].name);
			
                    //sect = up_sect.section(m1, m3 || null);
                });
                continue;
            }

        
            // Property
            prop = prop.length > 0 ? prop + ' ' + ln : ln;

            // Match property
            // NOTE: Does not support: prop = "foo" bar "baz"
            m = /^([A-Za-z0-9._-]+)(\s*=\s*("(\\"|.)*"|[^#;]*)?)?/.exec(prop);
            if (m && m[0].length) {
                key = m[1];
                if (m[3] && m[3].length) {
                    val = m[3];

                    // Trim the value
                    val = val.replace(/^\s+|\s+$/g, '');

                    // Remove quotes
                    if (val.charAt(0) === '"' && val.charAt(val.length-1) === '"') {
                        val = val.substr(1, val.length-2);
                        val = val.replace(/\\\\/g, '\\')
                                 .replace(/\"/g, '"')
                                 .replace(/\\n/g, '\n')
                                 .replace(/\\t/g, '\t')
                                 .replace(/\\b/g, '\b');
                    // Check boolean
                    } else if (/^yes|on|true$/i.test(val)) {
                        val = true;
                    } else if (/^no|off|false$/i.test(val)) {
                        val = false;
                    // Check integer
                    } else if (/^[0-9]+$/i.test(val)) {
                        val = parseInt(val, 10);
                    }

                } else if (m[2]) {
                    val = '';
                } else {
                    val = true;
                }

		inis[index].add(new Property(key,val));
                //sect.property(key, val);
            }

            prop = '';
        }
        }
        
        parse(contents,this.sections);
        

        
    }
    
    function Section(name) {
         
	    this.name = name;
	    this.items = new Array();
           
	    this.add = function (prop) {
		    this.items.push(prop);
                    
	    }
            
    }
    
    function Property(name,val) {
	    this.name = name;
	    this.val = val;
            
    }
    
  
 
      function toStr() {
          var s="";
         
        for (var k =0; k<theini.sections.length; k++ ) {
 
            s+="["+theini.sections[k].name+"]\n";
 
            for (var p =0; p<theini.sections[k].items.length; p++ ) {
                s+=theini.sections[k].items[p].name+"="+theini.sections[k].items[p].val+"\n";
            }
        }
        
        return s;
        
        
    }
    
    







function setFileName(fname) {
    filename = fname;
}

function fileSystemInit() {
// alert("File system init");
//i made the filesize 100kb....?
//window.requestFileSystem(fileSystemType, 1024 * 1024, onGetFileSystemSuccess, onFileError);
  window.requestFileSystem(1, 1024 * 100, gotFSSuccess, failed);
}


function gotFSSuccess(filesystem) {
    
    FS = filesystem;
   // alert("Got the filesystem");
    FS.root.getFile(filename,{create : true},gotFileEntry,failed);
}

function gotFileEntry(theFile) {
//	alert("onGetFileSuccess: " + theFile.name);

    file_entry = theFile;
readFromFile();
    //thefileentry.file(gotFile,failed);
}

/*Reading the file here*/

function readFromFile() {
    file_entry.file(fileReaderSuccess,failed);
}

function fileReaderSuccess(file) {
	//alert("get reading file");
    var reader = new FileReader();
    reader.onloadend = function(e) {
    
     file_text = e.target.result;
     alert("read:"+file_text);
	    
	     if (file_text.length==0) {
	  
	  file_text="[author]\nname=Pieter\n[user]";
  }
 // alert("file_text: "+file_text);
  theini = new Ini(file_text);
	    
    };
    reader.onloaderror = function(e) {
    failed;
  };
  
  reader.readAsText(file);
  
  /*if (file_text.length===0)
    ini = new Ini('[user]');
  else 
  ini = new Ini(file_text);*/
 
}

/*Writing the file here*/


function writeToFile() {
	FS.root.getFile(filename,{create : true},gotFileEntryforWriter,failed);
    
}

function gotFileEntryforWriter(theFile) {
	theFile.createWriter(fileWriterSuccess, failed);
}

function fileWriterSuccess(writer) {
    writer.onwrite = function(e) {
//alert("Write Completed");
  };
    writer.write(toStr());//'[author]\nname=Pieter\n[user]');
    
}



function gotFile(thefile) {
    /*var reader = new FileReader();
    reader.readAsText(file);*/
    file = thefile;
}


function failed() {
    console.log(error.code);
    alert("failed..");
}
























    
    
    
    
    //var ini;
    
    
    
   
    
    
function startINI() {
  fileSystemInit();
	alert("init success");
  //filename = "settings.ini";
   
  
    //get text from phonegap-api
  /* ini = new Ini([    
    '[user]',
    'foo = ho iszit',
    'baz = "tttt"',
    '[other]',
    'foo = "2bar"',
    'baz = "ddd"',
    '[fff]',
    'hello = "how are you"',
].join('\n'));*/
  


    
}



function stopINI() {
    //write to file
    //file_text = 
    writeToFile();
    //delete ini;
}

function INIset(isection,ikey,ivalue) {
	/*if (ini==null) 
	ini = new INI('[user]');*/
    var sectionset=false;
    var keyset=false;
    for (var k =0; k<theini.sections.length; k++ ) {
        if (theini.sections[k].name==isection) {
            for (var p =0; p<theini.sections[k].items.length; p++ ) {
                if (theini.sections[k].items[p].name==ikey) {
                    theini.sections[k].items[p].val = ivalue;
                    keyset=true;
                    return true;
                }
                
            }
            if (!keyset) {
                    theini.sections[k].items.push(new Property(ikey,ivalue));
            }
            
            sectionset = true;
            return true;
        }
            
        
            
    }
    if (!sectionset) {
            theini.sections.push(new Section(isection));
            theini.sections[ini.sections.length-1].items.push(new Property(ikey,ivalue));
            return true;
    }
    
}
function INIget(section,key) {
    for (var k =0; k<theini.sections.length; k++ ) {
        if (theini.sections[k].name == section)
        for (var p =0; p<theini.sections[k].items.length; p++ ) {
            if (theini.sections[k].items[p].name==key) {
                
                return theini.sections[k].items[p].val;
            }
        }
        
    }  
    
    
    return null;
    
}

function showContents() {
    alert(toStr());
}

