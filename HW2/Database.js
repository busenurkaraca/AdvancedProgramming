"use strict"
class Course{
    constructor(nme, time, date){
        this.nme = nme
        this.time = time
        this.date = date
        this.rooms = []
    }
}

class Student{
    constructor(id, nme, gpa){
        this.id = id
        this.nme = nme
        this.gpa = gpa
        this.courses = []
    }
}

class Database{
	 constructor () {
        this.students = new Map();
		this.courses = new Map();
    }	
}
	var map = new Database();
	var map2 = new Database();
	
function report(msg, id, list) {
    out.innerHTML += "<br>"; msg += " ";
    out.appendChild(document.createTextNode(msg));
    let n1;
    if (id) {
        n1 = document.createElement("span");
        n1.appendChild(document.createTextNode(id));
        n1.classList.add("link");
        out.appendChild(n1); msg += id;
        //n1.addEventListener("click", doClick);
    }
    if (list) {
        let n2 = document.createElement("span");
        n2.appendChild(document.createTextNode(""));
        n2.innerHTML += list.join("<br>");
        n2.classList.add("course");
        if (n1) n1.appendChild(n2);
    }
    console.log(msg);
}

function readStudents() {
	var url2 = "https://maeyler.github.io/JS/data/Students.txt";
	console.log("readStudents ");
    fetch(url2)
        .then(r => r.text(), report)
        .then(addStudents, report);
	console.log("finiş ");
}
function parseStudent(line) {
    let b = line.split("\t");
    let id = b[0], name = b[1], gpa = b[2];
    let stdCourses = [];
    for (let i=3; i<b.length; i++){ 
		stdCourses.push(b[i]);
		}
	return {id, name, gpa, stdCourses};
    
}
function addStudents(txt) {
	console.log("girdi ");
    let msg = txt.length+" chars, ";
    let a = txt.split("\n");
    msg += a.length+" lines, ";
	console.log("çıktı1 ");
	console.log("çıktı2 ");
    let i = 0;
    for (let s of a) {
      let std = parseStudent(s);
	  map.students.set(i,[std.id,std.name,std.gpa,std.stdCourses]);
	  i++;
    }
	console.log(map.students.get(10));
	console.log("çıktıson ");
}
function readCourses() {
	var url = "https://maeyler.github.io/JS/data/Courses.txt";
	console.log("readCourses ");
    fetch(url)
        .then(r => r.text(), report)
        .then(addCourse, report);
	console.log("finiş2 ");
}
function parseCourse(line) {
    let c = line.split("\t");
    let nme = c[0], time = c[1], date = c[2];
    let listCourses = [];
    for (let i=3; i<c.length; i++){ 
		listCourses.push(c[i]);
		}
	return {nme, time, date, listCourses};
    
}
function addCourse(txt) {
	console.log("girdi2 ");
    let msg = txt.length+" chars, ";
    let d = txt.split("\n");
    msg += d.length+" lines, ";
	console.log("çıktı11 ");
	console.log("çıktı22 ");
    let j = 0;
    for (let f of d) {
      let course = parseCourse(f);
	  map2.courses.set(j,[course.nme,course.time,course.date,course.listCourses]);
	  j++;
    }
	console.log(map2.courses.get(5));
	console.log("çıktıson2 ");
}




function randomStd() {
	out.innerText = null;
	let k = map.students.size ;
    let i = Math.trunc(k * Math.random());
	//console.log(i);
	//console.log(map.students.get(i));
	let entry = map.students.get(i);
	report("Random: "+ entry[1],entry[0]);
}
function higherGivenGPA() {
	out.innerText = null;
	out.innerText = " ";
	let sayac = 0;
    let b = gpa.value;
	for (let i=0; i< map.students.size; i++){
		let entry = map.students.get(i);
        if (entry[2] > b) {
			sayac++;
		}
	}
	
	report(gpa.value +" 'nin üstündeki öğrenci sayısı: "+sayac);
}
function givenStudentCourses() {
	out.innerText = null;
	let k = map.students.size ;
	for(let i = 0; i < k; i++){
		let entry = map.students.get(i);
		if(entry[0] == studentId.value && entry[1] == SName.value){
			out.innerText += SName.value+" 'ın dersleri: \n"+ entry[3].join("\n");
		}
	}
}

function givenCourseStudents() {
	out.innerText = null;
	let sayac = 0;
	out.innerText += " ";
	let k = map.students.size ;
	let stdCourse = [];
	let allCourses = [];
	let c = map2.courses.size;
	let dersler = [];
	for(let i = 0 ; i < c ;i++){
		let ders = map2.courses.get(i);
		dersler.push(ders[0]);
	}
	for(let i = 0; i < k; i++){
		let entry = map.students.get(i);
		stdCourse = entry[3].slice(0,entry[3].length);
		for(let j = 0; j< stdCourse.length; j++){
			if(stdCourse[j] == courseCode.value && dersler.includes(stdCourse[j])){
			report("* "+ entry[1]);
			sayac++;
		}
    }
  }
  console.log(sayac);
  report("Dersi alan öğrenci sayısı: "+ sayac);
}
function givenExamRoomCourses(){
	out.innerText = null;
	let z = map2.courses.size;
	let sınıflar = [];
	for(let i = 0; i < z; i++){
		let ders = map2.courses.get(i);
		sınıflar = ders[3].slice(0,ders[3].length);
		console.log(sınıflar);
		for(let j = 0; j < sınıflar.length; j++){
			if(eClass.value == sınıflar[j]){
				report("* "+ ders[0]);
			}
		}
	}	
}
function totalNumberOfCourses(){
	out.innerText = null;
	let sayac = 0;
	let z = map2.courses.size;
	let sınıflar = [];
	for(let i = 0; i < z; i++){
		let ders = map2.courses.get(i);
		sınıflar = ders[3].slice(0,ders[3].length);
		for(let j = 0; j < sınıflar.length; j++){
			if(eClass.value == sınıflar[j]){
				sayac++;
				
			}
		}
	}
		report(eClass.value+" sınıfının ders adeti: "+ sayac);
}
function courseTime(){
	out.innerText = null;
	let z = map2.courses.size;
	let sınıflar = [];
	for(let i = 0; i < z; i++){
		let ders = map2.courses.get(i);
		if(ders[0] == courseCode.value){
			report(courseCode.value+" dersinin saati: "+ ders[1]);
		}
	}
}

function sınavTakvimi(){
	out.innerText = null;
	let k = map.students.size;
	let z = map2.courses.size;
	let ogrDersleri = [];
	let dersler = [];
	for(let i = 0; i < k; i++){
		let entry = map.students.get(i);
		if(entry[0] == studentId.value && entry[1] == SName.value){
		ogrDersleri = entry[3].slice(0,entry[3].length); }
	}
	out.innerText += SName.value +" 'ın sınav takvimi: \n"
	for(let j = 0; j < z; j++ ){
		let ders = map2.courses.get(j);
		for(let y = 0; y < ogrDersleri.length; y++){
			if(ders[0] == ogrDersleri[y]){
				report(ders[0]+" "+ders[1]+" "+ders[2]);
			}
		}
  }
}
		







