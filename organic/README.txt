==============================================================================
===                                  Jmol                                  ===
==============================================================================


Jmol is an open-source molecule viewer and editor written in Java.

Full information is available at http://www.jmol.org/

Usage questions and comments should be posted to jmol-users@lists.sourceforge.net

Development questions, suggestions and comments should be posted
to jmol-developers@lists.sf.net


List of files included:
-------------------

- README.txt
	This file.

- COPYRIGHT.txt
	Copyright informations.

- LICENSE.txt
	GNU LGPL (terms of license for use and distribution of Jmol).
		
- Jmol.jar
	  Executable file for the Jmol application (a program written in Java). 
	This works as any other program: opens in its own window, can be 
	resized or minimized, admits drag-and-drop, has a top menu bar, 
	can open and save files, etc. It can be run from the command line 
	(particulary, using the shell or batch files described below), 
	but if Java is properly configured in your system, it's usually 
	enough to double-click on this file.

- jmol
	(Some kind of batch file to start Jmol application)
	
- jmol.bat
	A batch file to start Jmol application under Windows. 
		
- jmol.mac
	(Some kind of batch file to start Jmol application)
		
- jmol.sh
	  A shell script to start Jmol application under Unix-like systems, 
	like Linux, BSD, Solaris and Cygwin for Windows.

- JmolApplet.jar
	  The applet, i.e. a version of the program that will only run 
	when embedded in a web page. 
	  This is an all-in-one (or monolithic) file, kept mainly for 
	compatibility with old pages that call it explicitly. Current 
	recommended procedure is to use the split version (JmolApplet0.jar etc.,
	described below). In particular, Jmol.js uses the split version.
	  You may wish to use this if you want to keep your website simple or you 
	just want to upload a single jar file whenever new versions are released. 
	However, this will load Jmol somewhat slower than the split versions, 
	as all the program components must get loaded onto a user's machine 
	before any structure is displayed.
	  To invoke JmolApplet.jar from Jmol.js, either:
	a) put it in the folder containing the HTML page requiring it and 
		do not use jmolInitialize()
	or
	b) identify it explicitly in jmolInitialize(), for example:
		jmolInitialize("folder-containing-jar-files", "JmolApplet.jar")

- JmolAppletSigned.jar
	  An equivalent version of the applet, but this is a "signed" or 
	"trusted" applet (a term in Java security language). This means it 
	must be authorized by the web page visitor for it to run, but then 
	it will have less security restrictions for file access. For example, 
	it can access files on any part of the user's computer or from any 
	other web server.
	  Typically users get a message asking if they want to accept the 
	"certificate" or if they "trust" the applet, but this security feature 
	is not always enabled. If you decide to use JmolAppletSigned.jar 
	you should keep this in mind. 
	  Other than reading files, Jmol does not currently utilize other capabilities 
	of signed applets, such as accessing the System clipboard or writing files. 
	Use only if you know what you are doing and have considered the security issues.
	  To invoke JmolAppletSigned.jar from Jmol.js, use:
		jmolInitialize("folder-containing-jar-files", "JmolAppletSigned.jar")
		                  
- Jmol.js
	  The utilities library, written in JavaScript language, that assists in 
	the preparation of web pages that use Jmol applet, without the need to 
	know and write detailed JmolApplet code.
	  This library uses by default the split version of the applet (either
	unsigned or signed).
	  Fully documented at http://jmol.org/jslibrary/ 

- JmolApplet0.jar  and
  JmolApplet0(severalSuffixes).jar
	  The applet is divided up into several pieces according to their function, 
	so that if a page does not require a component, that component is 
	not downloaded from the server. It is still recommended that you put 
	all JmolApplet0*.jar files on your server, even if your page does not use 
	the capabilities provided by some of the files, because the pop-up menu 
	and Jmol console both allow users to access parts of Jmol you might 
	not have considered.
	  The set of these files is equivalent to the single JmolApplet.jar.
	  This split version is the one that will be used by default if you use 
	Jmol.js. For that, use the simplest form of jmolInitialize(), just 
	indicating the folder containing the set of jar files:
		jmolInitialize("folder-containing-jar-files")
	for example,
		jmolInitialize(".")  
			(if jar files are in the same folder as the web page)
		jmolInitialize("../jmol") 
			(if jar files are in a parallel folder, named 'jmol')
  
- JmolAppletSigned0.jar  and
  JmolAppletSigned0(severalSuffixes).jar
	  The signed version of the split applet. This version allows the user 
	to access files anywhere on the computer and from any location on the web. 
	Typically, users get a message asking if they want to accept the certificate 
	for **each** of the (currently 16) loadable jar files. For this reason, this 
	version may not be of general use.
	  The set of these files is equivalent to the single JmolAppletSigned.jar.
	  To use this with Jmol.js, use either:
	a) jmolInitialize("folder-containing-jar-files", true)
	or
	b) jmolInitialize("folder-containing-jar-files", "JmolAppletSigned0.jar")

---------------------------
Given the descriptions, you will realize that the distribution package contains 
4 full copies of the applet (signed or unsigned, split or not).
---------------------------
