// app/ChapterMCQScreen.jsx
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const whatsAppGreen = '#075E54';
// IMPORTANT: This is where you will add your manually created MCQ data.
// Replace the dummy data with your actual questions, options, and correct answers.
const mcqData = {
  '01': [
    {
      id: '1',
      question: 'A computer is primarily an electronic device that processes information based on instructions provided by a:',
      options: ['Manual guide', 'Program', 'Human operator', 'Mechanical switch'],
      correctAnswer: 'Program',
    },
    {
      id: '2',
      question: 'The invention of Abacus dates back approximately:',
      options: ['1000 years ago', '3000 years ago', '5000 years ago', '7000 years ago'],
      correctAnswer: '5000 years ago',
    },
    {
      id: '3',
      question: 'Which machine is considered the "first computer prototype"?',
      options: ['Pascaline', 'Napier\'s Bones', 'Abacus', 'Difference Engine'],
      correctAnswer: 'Abacus',
    },
    {
      id: '4',
      question: 'Blaise Pascal, a French mathematician, invented a calculating machine called:',
      options: ['Stepped Reckoner', 'Analytical Engine', 'Pascaline', 'Arithmometer'],
      correctAnswer: 'Pascaline',
    },
    {
      id: '5',
      question: 'The first general-purpose calculating machine, designed by Charles Babbage, was the:',
      options: ['Difference Engine', 'Analytical Engine', 'Tabulating Machine', 'Mark I'],
      correctAnswer: 'Analytical Engine',
    },
    {
      id: '6',
      question: 'Who is known as the "Father of Computer" for conceiving the Analytical Engine?',
      options: ['John Napier', 'Blaise Pascal', 'Charles Babbage', 'Herman Hollerith'],
      correctAnswer: 'Charles Babbage',
    },
    {
      id: '7',
      question: 'The first generation of computers primarily used what technology for their circuitry?',
      options: ['Transistors', 'Integrated Circuits', 'Vacuum Tubes', 'Microprocessors'],
      correctAnswer: 'Vacuum Tubes',
    },
    {
      id: '8',
      question: 'Which characteristic defines First Generation computers?',
      options: ['Small size and low power consumption', 'Use of machine language for programming', 'High-level programming languages', 'Use of keyboards and monitors'],
      correctAnswer: 'Use of machine language for programming',
    },
    {
      id: '9',
      question: 'Second Generation computers replaced vacuum tubes with:',
      options: ['Integrated Circuits', 'Transistors', 'Microprocessors', 'VLSI technology'],
      correctAnswer: 'Transistors',
    },
    {
      id: '10',
      question: 'What was a significant advantage of Second Generation computers over First Generation?',
      options: ['Larger physical size', 'Higher heat generation', 'Faster processing and smaller size', 'Reliance on machine language'],
      correctAnswer: 'Faster processing and smaller size',
    },
    {
      id: '11',
      question: 'The Third Generation of computers is characterized by the use of:',
      options: ['Vacuum Tubes', 'Transistors', 'Integrated Circuits (ICs)', 'Very Large Scale Integration (VLSI)'],
      correctAnswer: 'Integrated Circuits (ICs)',
    },
    {
      id: '12',
      question: 'The invention of the microprocessor is a hallmark of which computer generation?',
      options: ['First Generation', 'Second Generation', 'Third Generation', 'Fourth Generation'],
      correctAnswer: 'Fourth Generation',
    },
    {
      id: '13',
      question: 'Fourth Generation computers utilize:',
      options: ['Small Scale Integration', 'Medium Scale Integration', 'Large Scale Integration (LSI)', 'Very Large Scale Integration (VLSI)'],
      correctAnswer: 'Very Large Scale Integration (VLSI)',
    },
    {
      id: '14',
      question: 'The development of artificial intelligence and expert systems is associated with which generation?',
      options: ['Third Generation', 'Fourth Generation', 'Fifth Generation', 'Second Generation'],
      correctAnswer: 'Fifth Generation',
    },
    {
      id: '15',
      question: 'What type of software manages basic tasks like file management, memory management, and process management?',
      options: ['Application Software', 'Utility Software', 'System Software', 'Entertainment Software'],
      correctAnswer: 'System Software',
    },
    {
      id: '16',
      question: 'Which of the following is NOT a type of System Software?',
      options: ['Operating System', 'Device Driver', 'Language Processor', 'MS Excel'],
      correctAnswer: 'MS Excel',
    },
    {
      id: '17',
      question: 'Software that acts as an interface between the user and the computer hardware is known as:',
      options: ['Productivity Software', 'Operating System', 'Entertainment Software', 'Educational Software'],
      correctAnswer: 'Operating System',
    },
    {
      id: '18',
      question: 'What is the primary function of a Device Driver?',
      options: ['To browse the internet', 'To manage the hardware devices connected to the computer', 'To create documents', 'To play games'],
      correctAnswer: 'To manage the hardware devices connected to the computer',
    },
    {
      id: '19',
      question: 'A compiler is an example of a:',
      options: ['Utility Software', 'Operating System', 'Language Processor', 'Application Software'],
      correctAnswer: 'Language Processor',
    },
    {
      id: '20',
      question: 'Which of these translates a high-level language program line by line into machine language?',
      options: ['Compiler', 'Assembler', 'Interpreter', 'Device Driver'],
      correctAnswer: 'Interpreter',
    },
    {
      id: '21',
      question: 'Application Software is used to complete:',
      options: ['Basic computer operations', 'Specific tasks', 'Hardware diagnostics', 'Operating system updates'],
      correctAnswer: 'Specific tasks',
    },
    {
      id: '22',
      question: 'MS Office for Windows is an example of what type of application software?',
      options: ['Business Software', 'Entertainment Software', 'Productivity Software', 'Educational Software'],
      correctAnswer: 'Productivity Software',
    },
    {
      id: '23',
      question: 'Software used for teaching and learning purposes is categorized as:',
      options: ['Business Software', 'Entertainment Software', 'Productivity Software', 'Educational Software'],
      correctAnswer: 'Educational Software',
    },
    {
      id: '24',
      question: 'What is raw facts and figures that are unprocessed called?',
      options: ['Information', 'Output', 'Data', 'Program'],
      correctAnswer: 'Data',
    },
    {
      id: '25',
      question: 'A computer is an electronic data **processing** machine. This means it performs processes, calculations, and:',
      options: ['Displays images', 'Operations', 'Prints documents', 'Sends emails'],
      correctAnswer: 'Operations',
    },
    {
      id: '26',
      question: 'Which era of computer evolution saw the development of manually operated machines for simple arithmetic?',
      options: ['Electronic Era', 'Mechanical Era', 'Digital Era', 'Modern Era'],
      correctAnswer: 'Mechanical Era',
    },
    {
      id: '27',
      question: 'The concept of storing both instructions and data in memory was introduced by:',
      options: ['Charles Babbage', 'John von Neumann', 'Blaise Pascal', 'Herman Hollerith'],
      correctAnswer: 'John von Neumann',
    },
    {
      id: '28',
      question: 'Integrated Circuits (ICs) are also commonly known as:',
      options: ['Transistors', 'Microchips', 'Vacuum Tubes', 'Resistors'],
      correctAnswer: 'Microchips',
    },
    {
      id: '29',
      question: 'An Assembler is used to translate which language into machine language?',
      options: ['High-level language', 'Assembly language', 'Natural language', 'Binary language'],
      correctAnswer: 'Assembly language',
    },
    {
      id: '30',
      question: 'Which type of application software is used to manage business activities efficiently, like billing and inventory?',
      options: ['Productivity Software', 'Entertainment Software', 'Business Software', 'Educational Software'],
      correctAnswer: 'Business Software',
    },
  ],
  // Add more chapters here, e.g., '02', '03', etc., with their respective MCQs.
  // Each chapter should be an array of MCQ objects.
  '02': [
    {
      id: '1',
      question: 'An Operating System is a software that performs basic tasks like:',
      options: ['Only playing games', 'Only writing documents', 'Booting the computer and managing files', 'Sending emails'],
      correctAnswer: 'Booting the computer and managing files',
    },
    {
      id: '2',
      question: 'Which of these is NOT a common operating system mentioned?',
      options: ['Windows', 'Linux', 'Android', 'Microsoft Word'],
      correctAnswer: 'Microsoft Word',
    },
    {
      id: '3',
      question: 'The process of starting a computer operating system is called:',
      options: ['Formatting', 'Booting', 'Compiling', 'Debugging'],
      correctAnswer: 'Booting',
    },
    {
      id: '4',
      question: 'What is the primary role of the Operating System in managing computer resources?',
      options: ['Only running applications', 'Allocating and de-allocating processor and memory', 'Designing graphics', 'Browse the internet'],
      correctAnswer: 'Allocating and de-allocating processor and memory',
    },
    {
      id: '5',
      question: 'The part of the operating system that reads and interprets user commands into machine language is the:',
      options: ['Memory Manager', 'Device Driver', 'Command Interpreter', 'File Manager'],
      correctAnswer: 'Command Interpreter',
    },
    {
      id: '6',
      question: 'What module in an Operating System is responsible for allocating and de-allocating memory space?',
      options: ['File Management', 'Process Management', 'Memory Management', 'Device Management'],
      correctAnswer: 'Memory Management',
    },
    {
      id: '7',
      question: 'Software that facilitates I/O functions involving I/O devices is called a:',
      options: ['Operating System', 'Application Software', 'Device Driver', 'Utility Program'],
      correctAnswer: 'Device Driver',
    },
    {
      id: '8',
      question: 'A software that manages files and folders on a storage device is known as:',
      options: ['Memory Manager', 'File Manager', 'Process Manager', 'Device Manager'],
      correctAnswer: 'File Manager',
    },
    {
      id: '9',
      question: 'What is a daemon in the context of operating systems?',
      options: ['A user application', 'A background program that runs without direct user interaction', 'A type of hardware', 'A debugging tool'],
      correctAnswer: 'A background program that runs without direct user interaction',
    },
    {
      id: '10',
      question: 'What is a process in an operating system?',
      options: ['A static file', 'A program in execution', 'A hardware component', 'A type of memory'],
      correctAnswer: 'A program in execution',
    },
    {
      id: '11',
      question: 'What is multiprocessing in an operating system?',
      options: ['Running one program at a time', 'Executing multiple processes concurrently on a single CPU', 'Executing multiple processes on multiple CPUs simultaneously', 'Printing multiple documents'],
      correctAnswer: 'Executing multiple processes on multiple CPUs simultaneously',
    },
    {
      id: '12',
      question: 'The term used when multiple programs run concurrently on a single processor is:',
      options: ['Multiprocessing', 'Multitasking', 'Multithreading', 'Batch Processing'],
      correctAnswer: 'Multitasking',
    },
    {
      id: '13',
      question: 'What is the goal of deadlock prevention in an operating system?',
      options: ['To detect deadlocks after they occur', 'To allow all processes to complete without interruption', 'To ensure that a system never enters a deadlocked state', 'To restart the system when a deadlock occurs'],
      correctAnswer: 'To ensure that a system never enters a deadlocked state',
    },
    {
      id: '14',
      question: 'A common cause of computer infection that spreads through the internet is:',
      options: ['Hardware malfunction', 'Power outage', 'Malware and Viruses', 'Software updates'],
      correctAnswer: 'Malware and Viruses',
    },
    {
      id: '15',
      question: 'Protection against theft or damage to computer hardware, software, and information is called:',
      options: ['Data Backup', 'Computer Repair', 'Computer Security', 'System Optimization'],
      correctAnswer: 'Computer Security',
    },
    {
      id: '16',
      question: 'Which of the following is a sign that a computer might be infected with a virus?',
      options: ['It runs faster than usual', 'It shows annoying messages and crashes during processes', 'It cools down immediately', 'It opens files automatically'],
      correctAnswer: 'It shows annoying messages and crashes during processes',
    },
    {
      id: '17',
      question: 'What is a good practice to prevent malware and viruses?',
      options: ['Never install anti-virus software', 'Click on all internet links', 'Keep your operating system updated and run scheduled scans', 'Use open WiFi networks for all activities'],
      correctAnswer: 'Keep your operating system updated and run scheduled scans',
    },
    {
      id: '18',
      question: 'What should you avoid doing to prevent virus infection from emails?',
      options: ['Sending emails to known contacts', 'Opening email attachments or clicking hyperlinks from unknown senders', 'Checking your inbox regularly', 'Using a strong password for your email'],
      correctAnswer: 'Opening email attachments or clicking hyperlinks from unknown senders',
    },
    {
      id: '19',
      question: 'For data recovery and preventing potential loss, what is a recommended measure?',
      options: ['Never back up files', 'Create a system restore point regularly', 'Only save data to one location', 'Never use cloud storage'],
      correctAnswer: 'Create a system restore point regularly',
    },
    {
      id: '20',
      question: 'Why are CDs or DVDs recommended for writing important data for backup purposes?',
      options: ['They are faster than hard drives', 'They are write-protected and do not easily catch viruses', 'They have unlimited storage capacity', 'They are always accessible without power'],
      correctAnswer: 'They are write-protected and do not easily catch viruses',
    },
    {
      id: '21',
      question: 'What is the purpose of spam blocking or filtering tools?',
      options: ['To speed up internet connection', 'To block unsolicited emails, instant messages, and pop-ups', 'To create new email accounts', 'To organize your files'],
      correctAnswer: 'To block unsolicited emails, instant messages, and pop-ups',
    },
    {
      id: '22',
      question: 'When downloading files, what is a safe practice?',
      options: ['Download from any source on the internet', 'Only download from trusted sources on the internet', 'Download without an antivirus', 'Download large files first'],
      correctAnswer: 'Only download from trusted sources on the internet',
    },
    {
      id: '23',
      question: 'Which of the following is NOT a common symptom of a computer virus?',
      options: ['System slowing down', 'Unusual behavior', 'Documents disappearing', 'Sudden increase in hard drive space'],
      correctAnswer: 'Sudden increase in hard drive space',
    },
    {
      id: '24',
      question: 'What does an anti-virus software primarily do?',
      options: ['Makes your computer faster', 'Protects against malware and viruses', 'Designs web pages', 'Manages your emails'],
      correctAnswer: 'Protects against malware and viruses',
    },
    {
      id: '25',
      question: 'If you receive a suspicious email, what is the best course of action?',
      options: ['Open all attachments immediately', 'Click on all links', 'Delete it or mark it as spam without opening attachments/links', 'Forward it to all your contacts'],
      correctAnswer: 'Delete it or mark it as spam without opening attachments/links',
    },
    {
      id: '26',
      question: 'What is the importance of keeping your operating system updated?',
      options: ['To make your computer aesthetically pleasing', 'To introduce new bugs', 'To get the latest security patches and features', 'To fill up disk space'],
      correctAnswer: 'To get the latest security patches and features',
    },
    {
      id: '27',
      question: 'What is a potential risk of using an open (unsecured) WiFi network?',
      options: ['Faster internet speed', 'Improved signal strength', 'Data can be intercepted by others', 'Better battery life'],
      correctAnswer: 'Data can be intercepted by others',
    },
    {
      id: '28',
      question: 'Before opening, you should scan which of the following for viruses?',
      options: ['External storage devices like USB flash drives', 'Your desktop background images', 'System restore points', 'The operating system itself'],
      correctAnswer: 'External storage devices like USB flash drives',
    },
    {
      id: '29',
      question: 'Why is it important to have backup of important files at more than one place?',
      options: ['To confuse hackers', 'To make files easier to search', 'To ensure data recovery in case of loss from one location', 'To increase file size'],
      correctAnswer: 'To ensure data recovery in case of loss from one location',
    },
    {
      id: '30',
      question: 'Cloud storage services like Google Drive and Microsoft OneDrive are useful for:',
      options: ['Only playing games online', 'Storing documents and files remotely for backup and access', 'Installing operating systems', 'Running hardware diagnostics'],
      correctAnswer: 'Storing documents and files remotely for backup and access',
    },
  ],
  '03': [
    {
      id: '1',
      question: 'Which software is one of the most famous word-processing software?',
      options: ['MS Excel', 'MS PowerPoint', 'MS Word', 'MS Access'],
      correctAnswer: 'MS Word',
    },
    {
      id: '2',
      question: 'What does WYSIWYG stand for in MS Word?',
      options: ['What You See Is What You Get', 'Why You See Is Why You Go', 'Where You Stand Is Where You Grow', 'What You Say Is What You Gain'],
      correctAnswer: 'What You See Is What You Get',
    },
    {
      id: '3',
      question: 'The Page Layout tab in MS Word has how many groups of related commands?',
      options: ['Three', 'Four', 'Five', 'Six'],
      correctAnswer: 'Five',
    },
    {
      id: '4',
      question: 'A predefined set of formatting, colors, and settings that changes the overall design of the document is called a:',
      options: ['Template', 'Style', 'Theme', 'Format Painter'],
      correctAnswer: 'Theme',
    },
    {
      id: '5',
      question: 'Settings like margins, orientation, and size are found in which group of the Page Layout tab?',
      options: ['Themes', 'Page Setup', 'Page Background', 'Paragraph'],
      correctAnswer: 'Page Setup',
    },
    {
      id: '6',
      question: 'The area or space between the main content of a page and the page edges is called:',
      options: ['Header', 'Footer', 'Margin', 'Gutter'],
      correctAnswer: 'Margin',
    },
    {
      id: '7',
      question: 'Page orientation can be set to Portrait (Vertical) or:',
      options: ['Diagonal', 'Landscape (Horizontal)', 'Square', 'Circular'],
      correctAnswer: 'Landscape (Horizontal)',
    },
    {
      id: '8',
      question: 'Which button is used to change the overall size of the paper document?',
      options: ['Margins', 'Orientation', 'Size', 'Columns'],
      correctAnswer: 'Size',
    },
    {
      id: '9',
      question: 'To divide the document into sections that can be formatted differently, you use:',
      options: ['Page Breaks', 'Column Breaks', 'Section Breaks', 'Line Breaks'],
      correctAnswer: 'Section Breaks',
    },
    {
      id: '10',
      question: 'What is the purpose of the Background group in the Page Layout tab?',
      options: ['To change text color', 'To apply watermarks, page color, or page borders', 'To add images', 'To set paragraph spacing'],
      correctAnswer: 'To apply watermarks, page color, or page borders',
    },
    {
      id: '11',
      question: 'In MS Excel, a spreadsheet is a grid of:',
      options: ['Documents and paragraphs', 'Pictures and videos', 'Rows and columns', 'Themes and styles'],
      correctAnswer: 'Rows and columns',
    },
    {
      id: '12',
      question: 'The intersection of a row and a column in MS Excel is called a:',
      options: ['Table', 'Range', 'Worksheet', 'Cell'],
      correctAnswer: 'Cell',
    },
    {
      id: '13',
      question: 'What is a collection of cells where data is entered and calculated in MS Excel?',
      options: ['Workbook', 'Worksheet', 'Chart', 'Database'],
      correctAnswer: 'Worksheet',
    },
    {
      id: '14',
      question: 'What is a collection of worksheets called in MS Excel?',
      options: ['Document', 'Workbook', 'Spreadsheet', 'Presentation'],
      correctAnswer: 'Workbook',
    },
    {
      id: '15',
      question: 'In MS Excel, formulas always begin with a(n):',
      options: ['@ sign', '# sign', '$ sign', '= sign'],
      correctAnswer: '= sign',
    },
    {
      id: '16',
      question: 'To add two cells (e.g., A1 and B1) in MS Excel, the correct formula would be:',
      options: ['ADD(A1,B1)', 'A1+B1', '=A1+B1', 'SUM A1 B1'],
      correctAnswer: '=A1+B1',
    },
    {
      id: '17',
      question: 'Charts are also known as:',
      options: ['Tables', 'Reports', 'Graphs', 'Matrices'],
      correctAnswer: 'Graphs',
    },
    {
      id: '18',
      question: 'The feature in MS Excel that allows users to present a set of data visually is:',
      options: ['Formulas', 'Filters', 'Charts', 'Pivot Tables'],
      correctAnswer: 'Charts',
    },
    {
      id: '19',
      question: 'Which of the following is NOT a common type of chart mentioned in MS Excel?',
      options: ['Bar Charts', 'Column Charts', 'Pie Charts', 'Flow Charts'],
      correctAnswer: 'Flow Charts',
    },
    {
      id: '20',
      question: 'To create a chart in MS Excel, what is the first step?',
      options: ['Type random data', 'Select the data table', 'Save the workbook', 'Close MS Excel'],
      correctAnswer: 'Select the data table',
    },
    {
      id: '21',
      question: 'MS PowerPoint is primarily used for:',
      options: ['Creating documents', 'Performing calculations', 'Creating presentations', 'Managing databases'],
      correctAnswer: 'Creating presentations',
    },
    {
      id: '22',
      question: 'A collection of individual slides containing information on a topic is called a:',
      options: ['Document', 'Workbook', 'Spreadsheet', 'Presentation'],
      correctAnswer: 'Presentation',
    },
    {
      id: '23',
      question: 'Individual pages within a PowerPoint presentation are known as:',
      options: ['Pages', 'Sheets', 'Slides', 'Frames'],
      correctAnswer: 'Slides',
    },
    {
      id: '24',
      question: 'To display a presentation to an audience, you would use:',
      options: ['Normal View', 'Outline View', 'Slide Sorter View', 'Slide Show View'],
      correctAnswer: 'Slide Show View',
    },
    {
      id: '25',
      question: 'What is the purpose of a "Theme" in MS PowerPoint?',
      options: ['To add background music', 'To apply a consistent design to all slides', 'To insert videos', 'To manage animations'],
      correctAnswer: 'To apply a consistent design to all slides',
    },
    {
      id: '26',
      question: 'Transitions in MS PowerPoint are:',
      options: ['Effects applied to text', 'Effects applied when moving from one slide to the next', 'Effects applied to images', 'Effects applied to sounds'],
      correctAnswer: 'Effects applied when moving from one slide to the next',
    },
    {
      id: '27',
      question: 'Animations in MS PowerPoint are effects applied to:',
      options: ['Entire slides', 'Individual objects on a slide', 'The background of a presentation', 'The duration of the presentation'],
      correctAnswer: 'Individual objects on a slide',
    },
    {
      id: '28',
      question: 'Which software is NOT part of the MS Office suite mentioned?',
      options: ['MS Word', 'MS Excel', 'MS Paint', 'MS PowerPoint'],
      correctAnswer: 'MS Paint',
    },
    {
      id: '29',
      question: 'Office Automation refers to the use of technology to automate routine office tasks and processes, leading to increased:',
      options: ['Complexity', 'Efficiency', 'Manual labor', 'Paperwork'],
      correctAnswer: 'Efficiency',
    },
    {
      id: '30',
      question: 'A common use of MS Word in an office environment is for creating:',
      options: ['Databases', 'Spreadsheets', 'Documents and letters', 'Complex calculations'],
      correctAnswer: 'Documents and letters',
    },
  ],
  '04': [
    {
      id: '1',
      question: 'Data communications primarily refers to the sharing of a:',
      options: ['Physical message', 'Virtual message', 'Handwritten note', 'Verbal conversation'],
      correctAnswer: 'Virtual message',
    },
    {
      id: '2',
      question: 'Data communication is the exchange of digital messages between two devices via a:',
      options: ['Direct touch', 'Transmission medium', 'Smoke signal', 'Carrier pigeon'],
      correctAnswer: 'Transmission medium',
    },
    {
      id: '3',
      question: 'Collection of raw facts and figures is called:',
      options: ['Information', 'Output', 'Data', 'Program'],
      correctAnswer: 'Data',
    },
    {
      id: '4',
      question: 'The word "data" is derived from which language?',
      options: ['Greek', 'French', 'Latin', 'English'],
      correctAnswer: 'Latin',
    },
    {
      id: '5',
      question: 'The emission of data in any direction via wireless or wired medium is called:',
      options: ['Data Storage', 'Data Processing', 'Data Transmission', 'Data Analysis'],
      correctAnswer: 'Data Transmission',
    },
    {
      id: '6',
      question: 'Signals that are continuous and vary smoothly over time are:',
      options: ['Digital signals', 'Binary signals', 'Analog signals', 'Pulse signals'],
      correctAnswer: 'Analog signals',
    },
    {
      id: '7',
      question: 'Human voice is an example of a(n):',
      options: ['Digital signal', 'Analog signal', 'Binary signal', 'Light signal'],
      correctAnswer: 'Analog signal',
    },
    {
      id: '8',
      question: 'Signals represented by discrete values (e.g., 0s and 1s) are:',
      options: ['Analog signals', 'Digital signals', 'Continuous signals', 'Wave signals'],
      correctAnswer: 'Digital signals',
    },
    {
      id: '9',
      question: 'What converts analog signals into digital signals and vice versa?',
      options: ['Router', 'Switch', 'Modem', 'Hub'],
      correctAnswer: 'Modem',
    },
    {
      id: '10',
      question: 'The maximum rate at which data can be transferred over a medium is its:',
      options: ['Latency', 'Bandwidth', 'Throughput', 'Protocol'],
      correctAnswer: 'Bandwidth',
    },
    {
      id: '11',
      question: 'A set of rules that defines how data is formatted and transmitted is called a:',
      options: ['Network', 'Medium', 'Protocol', 'Server'],
      correctAnswer: 'Protocol',
    },
    {
      id: '12',
      question: 'What is a communication channel?',
      options: ['A type of software', 'A pathway through which data travels', 'A computer program', 'A type of operating system'],
      correctAnswer: 'A pathway through which data travels',
    },
    {
      id: '13',
      question: 'Which of the following is NOT a wired transmission medium?',
      options: ['Twisted-Pair Cable', 'Coaxial Cable', 'Fiber Optic Cable', 'Radio Waves'],
      correctAnswer: 'Radio Waves',
    },
    {
      id: '14',
      question: 'What is a common use for Twisted-Pair Cable?',
      options: ['Long-distance internet backbone', 'Connecting TVs to antennas', 'Telephones and Ethernet networks', 'Deep-sea communication'],
      correctAnswer: 'Telephones and Ethernet networks',
    },
    {
      id: '15',
      question: 'Which cable type offers very high bandwidth and is made of glass or plastic strands?',
      options: ['Twisted-Pair Cable', 'Coaxial Cable', 'Fiber Optic Cable', 'Ethernet Cable'],
      correctAnswer: 'Fiber Optic Cable',
    },
    {
      id: '16',
      question: 'Wireless transmission media include:',
      options: ['Copper wires', 'Optical fibers', 'Radio waves and microwaves', 'Coaxial cables'],
      correctAnswer: 'Radio waves and microwaves',
    },
    {
      id: '17',
      question: 'A collection of interconnected computers and devices that can share resources is a:',
      options: ['Server', 'Network', 'Workstation', 'Database'],
      correctAnswer: 'Network',
    },
    {
      id: '18',
         question: 'A collection of interconnected computers and devices that can share resources is a:',
      options: ['Server', 'Network', 'Workstation', 'Database'],
      correctAnswer: 'Network',
    },
    {
      id: '19',
      question: 'A network that connects devices within a limited geographical area, like an office building, is a:',
      options: ['WAN', 'MAN', 'LAN', 'GAN'],
      correctAnswer: 'LAN',
    },
    {
      id: '20',
      question: 'A network that covers a large geographical area, often spanning cities or countries, is a:',
      options: ['LAN', 'MAN', 'WAN', 'PAN'],
      correctAnswer: 'WAN',
    },
    {
      id: '21',
      question: 'Which device connects different networks together and routes data packets?',
      options: ['Hub', 'Switch', 'Modem', 'Router'],
      correctAnswer: 'Router',
    },
    {
      id: '22',
      question: 'A device that forwards data frames to specific ports based on MAC addresses is a:',
      options: ['Hub', 'Switch', 'Repeater', 'Bridge'],
      correctAnswer: 'Switch',
    },
    {
      id: '23',
      question: 'A device that amplifies a signal to extend the range of a network is a:',
      options: ['Router', 'Switch', 'Repeater', 'Modem'],
      correctAnswer: 'Repeater',
    },
    {
      id: '24',
      question: 'A Network Interface Card (NIC) is used to connect a machine to the:',
      options: ['Printer', 'Monitor', 'Internet', 'Power Supply'],
      correctAnswer: 'Internet',
    },
    {
      id: '25',
      question: 'What type of address is permanently attached to the ROM of a NIC card?',
      options: ['Logical Address', 'IP Address', 'Physical Address', 'MAC Address'],
      correctAnswer: 'Physical Address',
    },
    {
      id: '26',
      question: 'A Physical Address is a how many bit MAC address?',
      options: ['16 bit', '32 bit', '48 bit', '64 bit'],
      correctAnswer: '48 bit',
    },
    {
      id: '27',
      question: 'An IP address is an example of a:',
      options: ['Physical Address', 'Hardware Address', 'Logical Address', 'MAC Address'],
      correctAnswer: 'Logical Address',
    },
    {
      id: '28',
      question: 'An IPV4 address is made up of how many binary bits?',
      options: ['16', '32', '64', '128'],
      correctAnswer: '32',
    },
    {
      id: '29',
      question: 'The portion of an IP address that identifies the computer or any other computing device is the:',
      options: ['Network portion', 'Host portion', 'Protocol portion', 'Subnet Mask'],
      correctAnswer: 'Host portion',
    },
    {
      id: '30',
      question: 'Which of the following is NOT true about Logical Addresses?',
      options: ['They can be changed', 'They are unique in one network', 'They are permanent', 'They are 32 bit IP Addresses'],
      correctAnswer: 'They are permanent',
    },
  ],
  '05': [
    {
      id: '1',
      question: 'Computer security is the protection against theft or damage to:',
      options: ['Only computer hardware', 'Only software applications', 'Computer hardware, software, and information', 'Only personal documents'],
      correctAnswer: 'Computer hardware, software, and information',
    },
    {
      id: '2',
      question: 'Why is computer security important?',
      options: ['To make computers run slower', 'To expose confidential information', 'To keep information protected and prevent viruses/malware', 'To increase data loss'],
      correctAnswer: 'To keep information protected and prevent viruses/malware',
    },
    {
      id: '3',
      question: 'Unauthorized access to a computer system is a significant:',
      options: ['Benefit', 'Threat', 'Feature', 'Update'],
      correctAnswer: 'Threat',
    },
    {
      id: '4',
      question: 'Malware is a general term for software designed to:',
      options: ['Improve computer performance', 'Harm or disrupt computer operations', 'Help create documents', 'Play games'],
      correctAnswer: 'Harm or disrupt computer operations',
    },
    {
      id: '5',
      question: 'A computer virus is a type of malware that:',
      options: ['Is harmless to the system', 'Attaches itself to legitimate programs and spreads', 'Only affects hardware', 'Requires user permission to spread'],
      correctAnswer: 'Attaches itself to legitimate programs and spreads',
    },
    {
      id: '6',
      question: 'A program that appears legitimate but performs malicious activities is called a:',
      options: ['Virus', 'Worm', 'Trojan Horse', 'Spyware'],
      correctAnswer: 'Trojan Horse',
    },
    {
      id: '7',
      question: 'Which type of malware can replicate itself and spread to other computers without human intervention?',
      options: ['Virus', 'Worm', 'Trojan Horse', 'Adware'],
      correctAnswer: 'Worm',
    },
    {
      id: '8',
      question: 'Software that collects information about users without their knowledge is:',
      options: ['Antivirus', 'Firewall', 'Spyware', 'Utility Software'],
      correctAnswer: 'Spyware',
    },
    {
      id: '9',
      question: 'What is a "cracker"?',
      options: ['Someone who bakes crackers', 'A person who gains unauthorized access to systems with malicious intent', 'A security analyst', 'A legitimate software developer'],
      correctAnswer: 'A person who gains unauthorized access to systems with malicious intent',
    },
    {
      id: '10',
      question: 'What is "phishing"?',
      options: ['A type of fishing sport', 'A fraudulent attempt to obtain sensitive information by disguising as a trustworthy entity', 'A method of securing networks', 'A way to create strong passwords'],
      correctAnswer: 'A fraudulent attempt to obtain sensitive information by disguising as a trustworthy entity',
    },
    {
      id: '11',
      question: 'A set of rules for ethical behavior in the use of computers is known as:',
      options: ['Cybercrime laws', 'Computer regulations', 'Computer ethics', 'Software licenses'],
      correctAnswer: 'Computer ethics',
    },
    {
      id: '12',
      question: 'Using someone else\'s work or ideas without proper attribution is called:',
      options: ['Copyright', 'Patent', 'Plagiarism', 'Fair Use'],
      correctAnswer: 'Plagiarism',
    },
    {
      id: '13',
      question: 'The illegal copying, distribution, or use of software is:',
      options: ['Software licensing', 'Software piracy', 'Software development', 'Software updates'],
      correctAnswer: 'Software piracy',
    },
    {
      id: '14',
      question: 'What is "cyberbullying"?',
      options: ['Using computers for educational purposes', 'Harassment or intimidation using electronic communication', 'Online gaming', 'Conducting online research'],
      correctAnswer: 'Harassment or intimidation using electronic communication',
    },
    {
      id: '15',
      question: 'What is the best way to protect your computer from viruses?',
      options: ['Never install any software', 'Install and regularly update anti-virus software', 'Share your passwords online', 'Disable all security features'],
      correctAnswer: 'Install and regularly update anti-virus software',
    },
    {
      id: '16',
      question: 'You should avoid clicking on internet links with unusual labels, images, or captions because they might lead to:',
      options: ['Fun games', 'Useful information', 'Malicious websites or downloads', 'Software updates'],
      correctAnswer: 'Malicious websites or downloads',
    },
    {
      id: '17',
      question: 'Opening email attachments or clicking on hyperlinks from unknown senders is a common way to:',
      options: ['Receive important news', 'Improve computer performance', 'Infect your computer with malware', 'Get free software'],
      correctAnswer: 'Infect your computer with malware',
    },
    {
      id: '18',
      question: 'Scanning USB flash drives, SD cards, and mobile phones before opening them helps to:',
      options: ['Speed up file transfer', 'Organize files better', 'Prevent virus infection', 'Increase storage capacity'],
      correctAnswer: 'Prevent virus infection',
    },
    {
      id: '19',
      question: 'To block unsolicited emails, instant messages, and pop-ups, you should use:',
      options: ['Web browser extensions', 'Spam blocking or filtering tools', 'System restore points', 'Device drivers'],
      correctAnswer: 'Spam blocking or filtering tools',
    },
    {
      id: '20',
      question: 'Why should you only download files and programs from trusted sources on the internet?',
      options: ['To ensure faster downloads', 'To avoid copyright issues', 'To minimize the risk of malware infection', 'To get higher quality software'],
      correctAnswer: 'To minimize the risk of malware infection',
    },
    {
      id: '21',
      question: 'The practice of making regular backups of important data is crucial for:',
      options: ['Saving disk space', 'Improving graphics performance', 'Data recovery in case of loss or damage', 'Faster internet Browse'],
      correctAnswer: 'Data recovery in case of loss or damage',
    },
    {
      id: '22',
      question: 'Creating a system restore point allows you to:',
      options: ['Completely erase your hard drive', 'Revert your computer to a previous state in case of issues', 'Install new software automatically', 'Optimize your network speed'],
      correctAnswer: 'Revert your computer to a previous state in case of issues',
    },
    {
      id: '23',
      question: 'Saving documents on cloud storage like Google Drive and Microsoft OneDrive is a good practice for:',
      options: ['Local backup only', 'Offline access only', 'Secure, off-site backup and accessibility', 'Speeding up computer startup'],
      correctAnswer: 'Secure, off-site backup and accessibility',
    },
    {
      id: '24',
      question: 'If your computer starts slowing down, behaves unusually, or crashes frequently, it might be a sign of:',
      options: ['Normal operation', 'Hardware upgrade needed', 'Malware infection', 'Low battery'],
      correctAnswer: 'Malware infection',
    },
    {
      id: '25',
      question: 'A firewall is a network security system that:',
      options: ['Speeds up internet traffic', 'Monitors and controls incoming and outgoing network traffic', 'Manages computer power', 'Organizes files and folders'],
      correctAnswer: 'Monitors and controls incoming and outgoing network traffic',
    },
    {
      id: '26',
      question: 'What does "confidentiality" in computer security mean?',
      options: ['Ensuring data is always available', 'Ensuring data is accurate and consistent', 'Protecting information from unauthorized access', 'Ensuring information is legally compliant'],
      correctAnswer: 'Protecting information from unauthorized access',
    },
    {
      id: '27',
      question: 'What does "integrity" in computer security mean?',
      options: ['Protecting information from unauthorized access', 'Ensuring data is accurate and consistent and has not been tampered with', 'Ensuring data is always available', 'Ensuring information is legally compliant'],
      correctAnswer: 'Ensuring data is accurate and consistent and has not been tampered with',
    },
    {
      id: '28',
      question: 'What does "availability" in computer security mean?',
      options: ['Protecting information from unauthorized access', 'Ensuring data is accurate and consistent', 'Ensuring authorized users have timely and reliable access to information', 'Ensuring information is legally compliant'],
      correctAnswer: 'Ensuring authorized users have timely and reliable access to information',
    },
    {
      id: '29',
      question: 'A strong password should typically include:',
      options: ['Only lowercase letters', 'Only numbers', 'A mix of uppercase and lowercase letters, numbers, and symbols', 'Personal information like birthdates'],
      correctAnswer: 'A mix of uppercase and lowercase letters, numbers, and symbols',
    },
    {
      id: '30',
      question: 'Which of these is an example of an ethical issue in computing?',
      options: ['Using licensed software', 'Plagiarism', 'Backing up your data', 'Updating your operating system'],
      correctAnswer: 'Plagiarism',
    },
  ],
  '06': [
    {
      id: '1',
      question: 'The development of websites and online applications is called:',
      options: ['Software Development', 'Web Development', 'Graphic Design', 'Network Engineering'],
      correctAnswer: 'Web Development',
    },
    {
      id: '2',
      question: 'A complete web application may consist of User Interface, Back-End Server Codes and a:',
      options: ['Printer', 'Monitor', 'Database', 'Scanner'],
      correctAnswer: 'Database',
    },
    {
      id: '3',
      question: 'The term "www" commonly refers to the:',
      options: ['World Wide Wait', 'World Wide Web', 'Web Wide World', 'Web World Wide'],
      correctAnswer: 'World Wide Web',
    },
    {
      id: '4',
      question: 'A document commonly written in HTML that is accessible through the internet is a:',
      options: ['Website', 'Web browser', 'Webpage', 'Search Engine'],
      correctAnswer: 'Webpage',
    },
    {
      id: '5',
      question: 'A collection of webpages containing text, images, and multimedia related to a specific set of information is a:',
      options: ['Webpage', 'Website', 'Web server', 'Web client'],
      correctAnswer: 'Website',
    },
    {
      id: '6',
      question: 'What is a software application for accessing websites on the World Wide Web?',
      options: ['Search Engine', 'Web Server', 'Web Browser', 'Operating System'],
      correctAnswer: 'Web Browser',
    },
    {
      id: '7',
      question: 'The address of a resource on the internet (e.g., `https://www.google.com`) is called a:',
      options: ['IP Address', 'MAC Address', 'URL', 'Domain Name'],
      correctAnswer: 'URL',
    },
    {
      id: '8',
      question: 'A web-based tool that enables a user to locate information on the web is a:',
      options: ['Web Browser', 'Web Server', 'Search Engine', 'Web Hosting'],
      correctAnswer: 'Search Engine',
    },
    {
      id: '9',
      question: 'The web page that serves as the starting point of a website is typically known as the:',
      options: ['Last page', 'Contact page', 'Home page', 'About page'],
      correctAnswer: 'Home page',
    },
    {
      id: '10',
      question: 'A service that allows a web developer to make their website accessible on the internet is:',
      options: ['Web Designing', 'Web Hosting', 'Web Coding', 'Web Marketing'],
      correctAnswer: 'Web Hosting',
    },
    {
      id: '11',
      question: 'HTML stands for:',
      options: ['HyperText Markup Language', 'High-level Text Machine Language', 'Hyperlink and Text Management Language', 'Home Tool Markup Language'],
      correctAnswer: 'HyperText Markup Language',
    },
    {
      id: '12',
      question: 'What is the primary purpose of HTML?',
      options: ['To style webpages', 'To define the structure and content of web pages', 'To add interactivity to webpages', 'To manage databases'],
      correctAnswer: 'To define the structure and content of web pages',
    },
    {
      id: '13',
      question: 'HTML tags are written inside:',
      options: ['Parentheses ()', 'Square brackets []', 'Curly braces {}', 'Angle brackets <>'],
      correctAnswer: 'Angle brackets <>',
    },
    {
      id: '14',
      question: 'Which HTML tag is used for the largest heading?',
      options: ['<h1>', '<h2>', '<h3>', '<p>'],
      correctAnswer: '<h1>',
    },
    {
      id: '15',
      question: 'Which HTML tag is used to define a paragraph?',
      options: ['<para>', '<p>', '<text>', '<line>'],
      correctAnswer: '<p>',
    },
    {
      id: '16',
      question: 'The HTML tag used to create an unordered list is:',
      options: ['<ol>', '<ul>', '<li>', '<dl>'],
      correctAnswer: '<ul>',
    },
    {
      id: '17',
      question: 'Which HTML tag is used to create an ordered list?',
      options: ['<ol>', '<ul>', '<li>', '<dl>'],
      correctAnswer: '<ol>',
    },
    {
      id: '18',
      question: 'What does CSS stand for?',
      options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style Syntax', 'Colorful Style Sheets'],
      correctAnswer: 'Cascading Style Sheets',
    },
    {
      id: '19',
      question: 'What is the primary purpose of CSS?',
      options: ['To structure web content', 'To add interactivity to web pages', 'To style the presentation of web pages', 'To manage server-side logic'],
      correctAnswer: 'To style the presentation of web pages',
    },
    {
      id: '20',
      question: 'Which HTML tag is commonly used to link an external CSS file?',
      options: ['<style>', '<css>', '<link>', '<script>'],
      correctAnswer: '<link>',
    },
    {
      id: '21',
      question: 'JavaScript is primarily used for:',
      options: ['Styling web pages', 'Structuring web content', 'Adding interactivity and dynamic behavior to web pages', 'Storing data'],
      correctAnswer: 'Adding interactivity and dynamic behavior to web pages',
    },
    {
      id: '22',
      question: 'A table in HTML is defined using which tag?',
      options: ['<tab>', '<table>', '<grid>', '<sheet>'],
      correctAnswer: '<table>',
    },
    {
      id: '23',
      question: 'Which HTML tag defines a table row?',
      options: ['<td>', '<th>', '<tr>', '<thead>'],
      correctAnswer: '<tr>',
    },
    {
      id: '24',
      question: 'Which HTML tag defines a table header cell?',
      options: ['<td>', '<th>', '<tr>', '<tbody>'],
      correctAnswer: '<th>',
    },
    {
      id: '25',
      question: 'The content inside a cell in an HTML table is placed using which tag?',
      options: ['<th>', '<tr>', '<td>', '<cell>'],
      correctAnswer: '<td>',
    },
    {
      id: '26',
      question: 'HTML frames allow displaying the contents of:',
      options: ['Only images', 'Only text', 'Another HTML document within a web page', 'Only videos'],
      correctAnswer: 'Another HTML document within a web page',
    },
    {
      id: '27',
      question: 'Which HTML tag is used to define a frame?',
      options: ['<frameset>', '<frame>', '<iframe src>', '<area>'],
      correctAnswer: '<frame>',
    },
    {
      id: '28',
      question: 'Which of the following is NOT a tool that helps in designing and developing a website?',
      options: ['Microsoft FrontPage', 'Adobe Dreamweaver', 'Microsoft Visual Studio', 'MS Paint'],
      correctAnswer: 'MS Paint',
    },
    {
      id: '29',
      question: 'The web development process includes steps like planning, designing, coding, testing, and:',
      options: ['Deleting', 'Ignoring', 'Maintaining', 'Sharing on social media'],
      correctAnswer: 'Maintaining',
    },
    {
      id: '30',
      question: 'What is the function of a `frameset` tag in HTML?',
      options: ['To define a single frame', 'To define how a web page is divided into rows and columns for multiple frames', 'To style frames', 'To add content to a frame'],
      correctAnswer: 'To define how a web page is divided into rows and columns for multiple frames',
    },
  ],
  '07': [
    {
      id: '1',
      question: 'A database primarily stores data in an:',
      options: ['Unorganized pile', 'Encrypted format only', 'Organized form', 'Temporary location'],
      correctAnswer: 'Organized form',
    },
    {
      id: '2',
      question: 'What are the rows and columns in a database table called, respectively?',
      options: ['Files and folders', 'Records and fields', 'Documents and paragraphs', 'Sections and blocks'],
      correctAnswer: 'Records and fields',
    },
    {
      id: '3',
      question: 'A general store database might include tables for:',
      options: ['Only sales records', 'Only stock records', 'Purchase, sales, and stock records', 'Only customer names'],
      correctAnswer: 'Purchase, sales, and stock records',
    },
    {
      id: '4',
      question: 'What is the main goal of a database in an organization?',
      options: ['To increase data loss', 'To make data manipulation difficult', 'To minimize loss and increase productivity and efficiency', 'To hide information from users'],
      correctAnswer: 'To minimize loss and increase productivity and efficiency',
    },
    {
      id: '5',
      question: 'DBMS stands for:',
      options: ['Data Backup Management System', 'Database Building Management System', 'Database Management System', 'Digital Backup Management Software'],
      correctAnswer: 'Database Management System',
    },
    {
      id: '6',
      question: 'A collection of programs that enables users to create, maintain, and manage data in a database is a:',
      options: ['Operating System', 'Application Software', 'Database Management System (DBMS)', 'Utility Program'],
      correctAnswer: 'Database Management System (DBMS)',
    },
    {
      id: '7',
      question: 'Which of the following is NOT a characteristic of a DBMS?',
      options: ['Data Redundancy', 'Data Security', 'Data Consistency', 'Data Sharing'],
      correctAnswer: 'Data Redundancy',
    },
    {
      id: '8',
      question: 'The problem of storing the same data multiple times in different places is known as:',
      options: ['Data Consistency', 'Data Redundancy', 'Data Integrity', 'Data Security'],
      correctAnswer: 'Data Redundancy',
    },
    {
      id: '9',
      question: 'When multiple copies of the same data do not match, it leads to:',
      options: ['Data Consistency', 'Data Integrity', 'Data Inconsistency', 'Data Efficiency'],
      correctAnswer: 'Data Inconsistency',
    },
    {
      id: '10',
      question: 'What ensures that data remains accurate, complete, and reliable?',
      options: ['Data Redundancy', 'Data Inconsistency', 'Data Integrity', 'Data Loss'],
      correctAnswer: 'Data Integrity',
    },
    {
      id: '11',
      question: 'Which of these is a benefit of using a DBMS?',
      options: ['Increased data redundancy', 'Poor data security', 'Improved data sharing', 'Difficulty in data management'],
      correctAnswer: 'Improved data sharing',
    },
    {
      id: '12',
      question: 'A Flat File System typically stores data in:',
      options: ['Multiple interconnected tables', 'A single table or file', 'A hierarchical structure', 'A network model'],
      correctAnswer: 'A single table or file',
    },
    {
      id: '13',
      question: 'What is a major disadvantage of a Flat File System compared to a DBMS?',
      options: ['Better data security', 'Less data redundancy', 'More data inconsistency and difficulty in updating', 'Easier data sharing'],
      correctAnswer: 'More data inconsistency and difficulty in updating',
    },
    {
      id: '14',
      question: 'What is the role of a "Field" in a database table?',
      options: ['It represents a complete record', 'It contains a single piece of data for each record', 'It links to other tables', 'It stores the entire database'],
      correctAnswer: 'It contains a single piece of data for each record',
    },
    {
      id: '15',
      question: 'A unique identifier for each record in a table is called a:',
      options: ['Foreign Key', 'Candidate Key', 'Primary Key', 'Secondary Key'],
      correctAnswer: 'Primary Key',
    },
    {
      id: '16',
      question: 'What property must a Primary Key possess?',
      options: ['It can contain duplicate values', 'It can be null', 'It must be unique and not null', 'It must be a text field'],
      correctAnswer: 'It must be unique and not null',
    },
    {
      id: '17',
      question: 'A field in one table that refers to the primary key in another table is a:',
      options: ['Primary Key', 'Candidate Key', 'Foreign Key', 'Composite Key'],
      correctAnswer: 'Foreign Key',
    },
    {
      id: '18',
      question: 'What is the main purpose of a Foreign Key?',
      options: ['To identify unique records in its own table', 'To establish and enforce relationships between tables', 'To sort data in a table', 'To encrypt data'],
      correctAnswer: 'To establish and enforce relationships between tables',
    },
    {
      id: '19',
      question: 'Which of these is a characteristic of a Foreign Key?',
      options: ['It must always be unique', 'It can be null', 'It cannot refer to a non-existent Primary Key value', 'It is always automatically generated'],
      correctAnswer: 'It can be null',
    },
    {
      id: '20',
      question: 'A table is a collection of:',
      options: ['Charts', 'Reports', 'Records and fields', 'Forms and queries'],
      correctAnswer: 'Records and fields',
    },
    {
      id: '21',
      question: 'Data types are assigned to fields to:',
      options: ['Make the database larger', 'Ensure proper data storage and validation', 'Improve the visual appearance of the database', 'Reduce search speed'],
      correctAnswer: 'Ensure proper data storage and validation',
    },
    {
      id: '22',
      question: 'Which data type is used for numbers that will not be used in calculations (e.g., phone numbers)?',
      options: ['Number', 'Currency', 'Text', 'Date/Time'],
      correctAnswer: 'Text',
    },
    {
      id: '23',
      question: 'A collection of objects that are important in an organization and can be uniquely identified is called a(n):',
      options: ['Attribute', 'Relationship', 'Entity', 'Database'],
      correctAnswer: 'Entity',
    },
    {
      id: '24',
      question: 'Characteristics or properties that describe an entity are called:',
      options: ['Entities', 'Relationships', 'Attributes', 'Records'],
      correctAnswer: 'Attributes',
    },
    {
      id: '25',
      question: 'The way in which two or more entities are associated with each other is called a:',
      options: ['Attribute', 'Relationship', 'Table', 'Field'],
      correctAnswer: 'Relationship',
    },
    {
      id: '26',
      question: 'An ERD (Entity-Relationship Diagram) uses a diamond shape to represent:',
      options: ['Entity', 'Attribute', 'Relationship', 'Table'],
      correctAnswer: 'Relationship',
    },
    {
      id: '27',
      question: 'In an ERD, an entity is represented by which shape?',
      options: ['Diamond', 'Ellipse', 'Rectangle', 'Circle'],
      correctAnswer: 'Rectangle',
    },
    {
      id: '28',
      question: 'The shape used to represent an attribute in an ERD is a(n):',
      options: ['Diamond', 'Rectangle', 'Ellipse', 'Triangle'],
      correctAnswer: 'Ellipse',
    },
    {
      id: '29',
      question: 'What kind of relationship exists when one record in table A can relate to many records in table B, and one record in table B can relate to many records in table A?',
      options: ['One-to-One', 'One-to-Many', 'Many-to-One', 'Many-to-Many'],
      correctAnswer: 'Many-to-Many',
    },
    {
      id: '30',
      question: 'Which of the following is NOT a benefit of using relationships in a database?',
      options: ['Data consistency', 'Reduced data redundancy', 'Faster data entry for unrelated data', 'Improved data integrity'],
      correctAnswer: 'Faster data entry for unrelated data',
    },
  ],
};

const ChapterMCQScreen = () => {
  const router = useRouter();
  const { chapterId, chapterTitle } = useLocalSearchParams();
  const [currentMCQs, setCurrentMCQs] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (chapterId && mcqData[chapterId]) {
      setCurrentMCQs(mcqData[chapterId]);
      setSelectedAnswers({});
      setShowResults(false);
      setScore(0);
    } else {
      setCurrentMCQs([]);
      Alert.alert('No MCQs', `No MCQs available for chapter ${chapterId}.`);
    }
  }, [chapterId]);

  const handleOptionPress = (mcqId, option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [mcqId]: option,
    }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    currentMCQs.forEach((mcq) => {
      if (selectedAnswers[mcq.id] === mcq.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setShowResults(true);
  };

  const getOptionStyle = (mcqId, option) => {
    const isSelected = selectedAnswers[mcqId] === option;
    const isCorrect = option === currentMCQs.find((q) => q.id === mcqId)?.correctAnswer;
    const commonStyles = {
      backgroundColor: '#f0f0f0',
      borderColor: '#ddd',
      borderWidth: 1,
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
      width: '100%',
      minHeight: 50, // Maintain minimum height
      justifyContent: 'center', // Center content vertically
    };

    if (showResults) {
      if (isCorrect) {
        return { ...commonStyles, backgroundColor: '#d4edda', borderColor: '#28a745' }; // Green for correct
      } else if (isSelected && !isCorrect) {
        return { ...commonStyles, backgroundColor: '#f8d7da', borderColor: '#dc3545' }; // Red for incorrect selected
      } else {
        return commonStyles; // Default for unselected incorrect
      }
    } else {
      // Before submission
      if (isSelected) {
        return { ...commonStyles, backgroundColor: '#cce5ff', borderColor: '#007bff' }; // Blue when selected
      }
      return commonStyles; // Default style
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={whatsAppGreen} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {chapterTitle ? `${chapterTitle} MCQs` : 'Chapter MCQs'}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {currentMCQs.length > 0 ? (
          currentMCQs.map((mcq) => (
            <View key={mcq.id} style={styles.mcqContainer}>
              <Text style={styles.questionText}>{mcq.question}</Text>
              {mcq.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={getOptionStyle(mcq.id, option)}
                  onPress={() => handleOptionPress(mcq.id, option)}
                  activeOpacity={0.8}
                  disabled={showResults}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 50, fontSize: 16 }}>
            No MCQs available for this chapter yet.
          </Text>
        )}

        {currentMCQs.length > 0 && !showResults && (
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} activeOpacity={0.8}>
            <Text style={styles.submitButtonText}>Submit Answers</Text>
          </TouchableOpacity>
        )}

        {showResults && (
          <Text style={styles.resultText}>
            Your Score: {score} / {currentMCQs.length}
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: {
    backgroundColor: whatsAppGreen,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: { marginRight: 16 },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
  },
  mcqContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: whatsAppGreen,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: whatsAppGreen,
  },
});

export default ChapterMCQScreen;