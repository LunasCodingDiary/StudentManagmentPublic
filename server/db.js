const Sequelize = require ('sequelize');
const {STRING, DECIMAL, TEXT} = Sequelize.DataTypes; //VALCHAR or TEXT

// DB
const conn = new Sequelize (process.env.DATABASE_URL || 'postgres://localhost/jpfp')

// Models
const Campus = conn.define('campus',{
    name:{
      type: STRING,
      allowNull:false,
      unique: true,
      validate:{
        notEmpty: true,
        notNull: true,
      }
    },
    imageUrl:{
        type: STRING,
        allowNull:true,       
    },
    address:{
        type: STRING,
        allowNull:false,
        validate:{
          notEmpty: true,
          notNull: true
        }      
    },
    description:{
        type: TEXT,
        allowNull:true,       
    }
})

const Student = conn.define('student',{
    firstName:{
        type: STRING,
        allowNull: false,
        validate:{
          notEmpty: true,
          notNull: true
        }
    },
    lastName:{
        type: STRING,
        allowNull: false,
        validate:{
          notEmpty: true,
          notNull: true
        }
    },
    email:{
        type: STRING,
        allowNull: false,
        validate:{
          notEmpty: true,
          notNull: true,
          isEmail: true // checks for email format (foo@bar.com)
        }
    },
    imageUrl:{
        type: STRING,
        allowNull:true,       
    },
    gpa:{
        type: DECIMAL,
        allowNull:false,
        validate:{
          min:0.00,
          max:4.00
        }       
    }
})

//Associations 
Student.belongsTo(Campus) // methods: setSchool
Campus.hasMany(Student) //specify foriegn key


//Sync And Seed
const syncAndSeed = async() => {
    await conn.sync({force:true});
    // const [joe,luna,jason] = await Promise.all(
    //     ['joe','luna','jason'].map(name=>{
    //     return Student.create({name})
    //     }
    // ))
    
    const[NYU, Yale, luna, joe, jason] = await Promise.all([ // data
    Campus.create({name: 'New York University', address: '721 Broadway'}),
    Campus.create({name: 'Yale University', address: 'New Haven'}),
    Student.create({firstName:'Luna', lastName: 'Fang', email: 'lf1656@nyu.edu', gpa:4.0}),
    Student.create({firstName:'Joe', lastName: 'Kay', email: 'jk96@yale.edu', gpa:3.8}),
    Student.create({firstName:'Jason', lastName: 'OOi', email: 'jo00@nyu.edu', gpa:3.9})
    ])
    luna.setCampus(NYU.id)
    jason.setCampus(NYU.id)
    joe.setCampus(Yale.id)
    //notes: sometimes you need an instance method, eg."setSchool" 
  
}
//export
module.exports = {conn, syncAndSeed, Campus, Student}