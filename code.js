const url = "http://localhost:3000";
console.clear()
Vue.config.devtools=false
Vue.config.productionTip=false
const vuetifyOptions = {}


var app = new Vue ({
    el: "#app",
    vuetify:new Vuetify(vuetifyOptions),
    data: {
        greeting: "Hello People",
        page:"home",
        title: "iSpend",
        // data info for fab Nav
        direction: "bottom",
        fab: false,
        fling: false,
        hover: false,
        tabs: null,
        top: true,
        right: false,
        bottom: false,
        left: true,
        transition: "slide-y-reverse-transition",
        dialog:false,
        paymentSave:false,
        dialog1:false,
        //        added data for new goal
        addingNewGoal: false,
        //        added data for editing goal
        editingGoal:false,
        //  added data for editing goal
        goalIndex:0,
        billsIndex:0,
        // data for sign up page
        rules: {
          email: v => (v || "").match(/@/) || "Please enter a valid email"
        },
        passwordFieldType:'password',
        goals: [
           
        ],
        addingUpcomingPayment: false,
        editingPayments: false,
        bills: [
            
        ],
        isDeadline: false,
        changeDueDate: false,
        month: [
            "01","02","03","04","05","06","07","08","09","10","11","12",
        ],
        day: [
            "01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31",
        ],
        year: [
            "2019","2020","2021","2022","2023",
        ],

        // data for total, savings, checking and related fields
        savings: "",
        checking: "",
        
        // categories:[
        //     {
        //         name:"shopping",
        //         spent_total:0,
        //         budget:0,
        //         recent_payments:[

        //         ]
            
              
        //     },
        //     {
        //         name:"food",
        //         spent_total:0,
        //         budget:0,
        //         recent_payments:[]
              
        //     },
        //     {
        //         name:"car",
        //         spent_total:0,
        //         budget:0,
        //         recent_payments:[]
              
        //     },
        //     {
        //         name:"fun",
        //         spent_tot:0,
        //         budget:0,
        //         recent_payments:[]
              
        //     }
        //   ],
        //start**********************************************************
        categories: [
          "Shopping","Food", "Car/Transportation", "Fun/etc."     
      ],
          // make sure budget list is same length as categories list
      budgets: [
          100,200,500,300
      ],
          //should also be same length
      totalSpentinCategory: [
          50,30,40,20
      ],
          //should also be the same length
      listCategorySpending: [
          [
              10,50,6040,60,70
          ],
          [
              30
          ],
          [
              40,50,60,8
          ],
          [
              100,30
          ],
          [
              70,80,93
          ]
      ],
      paymentDescriptions:[
        [
          "some description",
        ],
        [
          "",
        ],
        [
          "",
        ],
        [
          "",
        ],
      ],
      // if all of our lists are the same length we can create a functikno that will loop through all of the lists and match the indexes together so that the correct info goes with each category. 
      

      //end*************************************************************************
        userData: {},
        register_email: "",
        register_firstname:"",
		    register_password: "",
		    login_email: "",
        login_password: "",
        payDescription:"",
        paymentAmount:0,
        selectedCategory:"",
        newGoal:{
          goal:"",
          description:"",
          deadline:"",
          isDeadline:false
        },
        newBill:{
          billName:'',
          category:'',
          dueDate:'',
          decription:'',
          amount:''
        },

        pGoals: [
          {
            gName: "",
            gDue: "",
            gDescription: "",
            gIsDue: false,
          }
        ],

        pPayments: [
          {
            pName: "",
            pAmount: "0",
            pCategory: "Food",
          }
        ],

        pCategories: [
          {
            cName: "Shopping",
            cBudget: "",
            cIcon: "shopping_cart"
          },
          {
            cName: "Food",
            cBudget:"",
            cIcon: "local_dining"
          },{
            cName: "Car/Transportation",
            cBudget: "",
            cIcon: "commute"
          },{
            cName: "Fun/etc.",
            cBudget: "",
            cIcon: "beach_access"
          },
        ],
      ptotals: [],
      newBillMonth:"",
      newBillDay:"",
      newBillYear:"",
      budgetediting:false,
      budgetIndex:0,
    },
    created:function(){
      this.pCalcCategoryBudget();
    },
    methods: {
      formatDate: function() {
        var date= this.newBillYear+'-'+this.newBillMonth+'-'+this.newBillDay
        this.newBill.dueDate=date;
        this.newBillMonth='Select a Month';
        this.newBillDay= 'Select a Day';
        this.newBillYear= 'Select a Year';
    },

      
      pCalcCategoryBudget: function () {
        var totals=[]
        console.log(this.pCategories.length)
        for (var i = 0; i < this.pCategories.length; i++){
          var name=this.pCategories[i].cName
          total=0
          console.log(this.pPayments.length)
          for (var j = 0; j < this.pPayments.length; j++){
            if (this.pPayments[j].pCategory==name) {
              total+=Number(this.pPayments[j].pAmount)
              console.log(total);
            }
          }
          totals.push(total);
        }
        this.ptotals=totals;
      },
     
      // Local Server methods start--
      addPayment:function(){
        var payment={
          pName:this.payDescription,
          pAmount:this.paymentAmount,
          pCategory:this.selectedCategory
        };
        this.pPayments.push(payment);
        this.payDescription="";
        this.paymentAmount=0;
        this.selectedCategory="";
        this.pCalcCategoryBudget();
      },
      addNewGoalServer:function(){
        var new_goal ={
          goal: this.newGoal.goal,
          description:this.newGoal.description,
          deadline:this.newGoal.deadline
        }
        this.goals.push(new_goal);
        this.newGoal.goal="";
        this.newGoal.description="";
        this.newGoal.deadline="";
      },
      editGoal:function(){
        
      },
      addNewBillServer:function(){
        var new_bill={
          billName:this.newBill.billName,
          category:this.newBill.category,
          dueDate:this.newBill.dueDate,
          description:this.newBill.description,
          amount:this.newBill.amount,
        }
        this.bills.push(new_bill);
        this.newBill.billName="";
        this.newBill.category="";
        this.newBill.dueDate="";
        this.newBill.decription="";
        this.newBill.amount="";        
      },
      getCategories: function() {
          fetch(this.server_url+"/categories").then(function(res) {
              res.json().then(function(data) {
                  console.log(data);
                  app.categories = data.categories;
              });
          });
      },
      
    getGoal: function(i) {
      if (this.goals.length >=1) {
        return this.goals[i].goal;
        } else {
            return '';
        }
    },
    getGoalDescription: function(i) {
        if (this.goals.length >=1) {
            return this.goals[i].description;
        } else {
            return '';
        }
    },
    completedGoal: function(goalIndex) {
        if (this.goals.length >=1) {
            this.goals.splice(goalIndex, 1);
            console.log(goalIndex);
            console.log(this.goals.length);
        } else {
            this.goals=[];
        }
      },
   
    completedBill: function(paymentIndex) {
        if (this.bills.length != 0) {
            this.bills.splice(paymentIndex, 1);
            console.log(paymentIndex);
            console.log(this.bills.length);
        } else {
            this.bills=[];
        }
    },
    //end of local methods//
    getBudgets: function() {
      fetch(this.server_url+"/budgets").then(function(res) {
          res.json().then(function(data) {
              console.log(data);
              app.budgets = data.budgets;
          });
      });
    },
    getTotals: function() {
      fetch(this.server_url+"/totals").then(function(res) {
          res.json().then(function(data) {
              console.log(data);
              app.totals = data.totals;
          });
      });
    },

    // totalSpendinginCategory: function(categoryIndex){
    //   var total=0
    //     for (var i = 0; i < this.listCategorySpending[categoryIndex].length; i++) {
    //     } total+=this.listCategorySpending[categoryIndex][i]
    // },
  getCategorySpending: function() {
      fetch(this.server_url+"/spending").then(function(res) {
          res.json().then(function(data) {
              console.log(data);
              app.spending = data.spending;
          });
      });
    },
      register: function() {
        fetch(`${url}/users/register`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            username: this.register_email,
            password: this.register_password,
            firstname: this.register_firstname
          })
        }).then(function(response) {
          if (response.status == 422 || response.status == 400) {
            response.json().then(function(data) {
              alert(data.msg);
            })
          } else if (response.status == 201) {
            console.log("It worked");
          }
        });
      },
      login: function() {
        fetch(`${url}/users/login`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            username: this.login_email,
            password: this.login_password
          })
        }).then(function(response) {
          if (response.status == 200 || response.status == 403) {
            response.json().then(function(data) {
              alert(data.msg);
            })
          }
        });
      },
      checkAuthentication: function() {
        fetch(`${url}/`, {
          credentials: "include",
        }).then(function(response) {
          response.json().then(function(data) {
            alert(data.msg);
          });
        });
      },
      getMoney: function() {
        fetch("http:\\localhost:8080/money", {
            credentials: "include"
        }).then(function(res) {
            res.json().then(function(data) {
                app.userData = data.userData;
            });
        });
      },
      keepGoalIndex: function(goalName) {
          for (var i = 0; i < this.goals.length; i++) {
            } if (goalName==this.goals[i]) {
                this.goalsIndex=i;
            }
            return goalName;
        },
      keepPaymentIndex: function(billName) {
          for (var i = 0; i < this.bills.length; i++) {
            } if (billName==this.bills[i]) {
                this.itemIndex=i;
            }
            return billName;
        },
      getGoals: function ( ) {
			  fetch( `${ url }/goals` ).then( function ( response ) {
				  response.json( ).then( function ( data ) {
					  app.goals = data.goals;
				});
			});
		},
      addNewGoal: function ( ) {
			var req_body = {
				name: this.new_goal_input
			};
			fetch( `${ url }/goals`, {
				method: "POST",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify( req_body )
			}).then( function ( response ) {
				if ( response.status == 400 ) {
					response.json( ).then( function ( data ) {
						alert( data.msg );
					});
				} else if ( response.status == 201 ) {
					app.new_goal_input = "";
					app.getGoals( );
				}
			});
        },
      deleteGoal: function ( goal ) {
			  fetch( `${ url }/goals/${ goal.id }`, {
				method: "DELETE"
			}).then( function ( response ) {
				if ( response.status == 404 ) {
					response.json( ).then( function ( data ) {
						alert( data.msg );
					});
				} else if ( response.status == 204 ) {
					app.getGoals( );
				}
			});
        },
		saveGoalEdit: function ( goal ) {
			var req_body = {
				name: goal.name
			};
			fetch( `${ url }/goals/${ goal.id }`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify( req_body )
			}).then( function ( response ) {
				if ( response.status == 400 || response.status == 404 ) {
					response.json( ).then( function ( data ) {
						alert( data.msg );
					});
				} else if ( response.status == 204 ) {
					goal.editing = false;
					app.getGoals( );
				}
			});
        },
      getBills: function ( ) {
			  fetch( `${ url }/bills` ).then( function ( response ) {
				response.json( ).then( function ( data ) {
					app.bills = data.bills;
				});
			});
		},
      addNewBill: function ( ) {
			  var req_body = {
				name: this.new_bill_input
			};
			fetch( `${ url }/bills`, {
				method: "POST",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify( req_body )
			}).then( function ( response ) {
				if ( response.status == 400 ) {
					response.json( ).then( function ( data ) {
						alert( data.msg );
					});
				} else if ( response.status == 201 ) {
					app.new_bill_input = "";
					app.getBills( );
				}
			});
        },
      deleteBill: function ( bill ) {
			  fetch( `${ url }/bills/${ bill.id }`, {
				method: "DELETE"
			}).then( function ( response ) {
				if ( response.status == 404 ) {
					response.json( ).then( function ( data ) {
						alert( data.msg );
					});
				} else if ( response.status == 204 ) {
					app.getBills( );
				}
			});
        },
		saveBillEdit: function ( bill ) {
			var req_body = {
				name: bill.name
			};
			fetch( `${ url }/bills/${ bill.id }`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify( req_body )
			}).then( function ( response ) {
				if ( response.status == 400 || response.status == 404 ) {
					response.json( ).then( function ( data ) {
						alert( data.msg );
					});
				} else if ( response.status == 204 ) {
					  bill.editing = false;
					  app.getBills( );
				}
			});
		},
    },
    computed:{

      total: function() {
        return (Number(this.savings)+Number(this.checking));
    },
    activeFab() {
        switch (this.tabs) {
          case "one":
            return { class: "purple", icon: "account_circle" };
          case "two":
            return { class: "red", icon: "edit" };
          case "three":
            return { class: "green", icon: "keyboard_arrow_up" };
          default:
            return {};
        }
      },

      watch: {
        top(val) {
          this.bottom = !val;
        },
        right(val) {
          this.left = !val;
        },
        bottom(val) {
          this.top = !val;
        },
        left(val) {
          this.right = !val;
        }
      }
    }
})