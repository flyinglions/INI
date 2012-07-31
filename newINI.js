function Ini(contents){
	
        this.sections = new Array();
        
        
        parse = function(content,inis) {
            var i, ln, m, key, val,  prop = '',
            lines = contents.split(/\r\n|\r|\n/);

        
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

            // Check if this line is continued on the next
            /*if (ln.charAt(ln.length-1) === '\\') {
                prop += ln.substr(0, ln.length-1);
                continue;
            }*/

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
    
  
    
    
    
    
    var ini;
    
      function toStr() {
          var s="";
         
        for (var k =0; k<ini.sections.length; k++ ) {
 
            s+="["+ini.sections[k].name+"]\n";
 
            for (var p =0; p<ini.sections[k].items.length; p++ ) {
                s+=ini.sections[k].items[p].name+"="+ini.sections[k].items[p].val+"\n";
            }
        }
        
        return s;
        
        
    }
    
    
function startINI() {
  
    //get text from phonegap-api
    ini = new Ini([    
    '[user]',
    'foo = "bar"',
    'baz = "tttt"',
    '[other]',
    'foo = "2bar"',
    'baz = "ddd"',
    '[fff]',
    'hello = "how are you"',
].join('\n'));


    
}



function stopINI() {
    //write to file
    delete ini;
}

function INIset(isection,ikey,ivalue) {
    var sectionset=false;
    var keyset=false;
    for (var k =0; k<ini.sections.length; k++ ) {
        if (ini.sections[k].name==isection) {
            for (var p =0; p<ini.sections[k].items.length; p++ ) {
                if (ini.sections[k].items[p].name==ikey) {
                    ini.sections[k].items[p].val = ivalue;
                    keyset=true;
                }
                
            }
            if (!keyset) {
                    ini.sections[k].items.push(new Property(ikey,ivalue));
            }
            
            sectionset = true;
            break;
        }
            
        
            
    }
    if (!sectionset) {
            ini.sections.push(new Section(isection));
            ini.sections[ini.sections.length-1].items.push(new Property(ikey,ivalue));
    }
    
}
function INIget(section,key) {
    for (var k =0; k<ini.sections.length; k++ ) {
        if (ini.sections[k].name == section)
        for (var p =0; p<ini.sections[k].items.length; p++ ) {
            if (ini.sections[k].items[p].name==key) {
                
                return ini.sections[k].items[p].val;
            }
        }
        
    }  
    
    
    return null;
    
}

function showContents() {
    alert(toStr());
}