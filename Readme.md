#File handling and INI file access

##First:

### (1) Include the inisystem.js file in your html ..
### (2) when the device is ready  - call startINI(): (see index.html for more detail)

# An INI system for storage and retrieval of settings

	//add the following code in html javascript tag:
	<script type="text/javascript">
	function onBodyLoad() {

	//Add the PhoneGap deviceready event listener
	document.addEventListener("deviceready", onDeviceReady, false);
	}

	function onDeviceReady() {
	//PhoneGap initialized


	 startINI();
	}
	</script>
	<body  onload="onBodyLoad()">
	//the rest of your stuff...

### (3) use the get and set functions in some of your other functions to store and get settings from the settings.ini file:

	/*set:*/ INIset("section_here","key_here","value_here");
	/*get:*/ var value_variable = INIget("section_here","key_here");
	
### (4) when done, call the stopINI() function to write the INI object back to the settings.ini file
	
##General File Handling:
	/*General file handling*/
	/*To delete a file */
	deleteFile("thefilenamehere");
	
	/*To read/write a file:*/
	/*Call this first:*/
	
	initFileSystem("filenamehere");
	
	/*then*/
	readFile();
	writeFile();
	
###NB

####The contents of a file is read to and written from a variable name {file_content}
####So just write to and read from that variable to access the contents after calling either readFile or writeFile
	
	
	

