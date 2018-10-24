class Course{
    constructor(nme, time, date, rooms){
        this.nme = nme
        this.time = time
        this.date = date
        this.rooms = rooms
    }
    toString(){
    return this.nme
    }
}

class Student{
    constructor(id, nme, gpa, courses){
        this.id = id
        this.nme = nme
        this.gpa = gpa
        this.courses = courses
    }
    toString(){
    return this.id
    }

}

class Point{
    constructor(a,b){
        this.x = a
        this.y = b
    }
    toString(){
    return this.x + " " + this.y
    }
}

class Points3D extends Point{
    constructor(a,b,c){
        super(a,b)
        this.z = c
    }
     toString(){
    return this.x + " " + this.y + " "+this.z
    }

}

class Distance{
constructor(km=0) {
    this.km = Math.round(km);
  }
  get miles() {
    return Math.round(this.km * 1.6);
  }
  set miles(value=0) {
    this.km = Math.round(value/ 1.6);
  }
  toString() {
    return this.km+" km"
  }
  static fromMiles(value) {
    let t = new Distance();
    t.miles = value;
    return t;
  }
}
