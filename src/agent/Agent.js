function coinToss() {
  return Math.random() > 0.5;
}

class Agent {
  constructor(name, type) {
    this.name = name;
    this.type = type;

    // if (coinToss()) {
    //   this.type = "user";
    // } else {
    //   this.type = "project";
    // }
  }

  //   static makeProjectUser(agent) {
  //     if (agent.type === "user") {
  //       return Object.assign(Object.create(new User()), agent);
  //     } else {
  //       return Object.assign(Object.create(new Project()), agent);
  //     }
  //   }
}

let agent;

if (coinToss()) {
  agent = new Agent();
} else {
}

class User extends Agent {
  sayName() {
    return `my name is ${this.name}`;
  }
}

class Project extends Agent {
  sayTheName() {
    return `the project name is ${this.name}`;
  }
}

// const agent =

// const projectUser = Agent.makeProjectUser(agent);

// const wish = require("wish");
// if (projectUser.type === "user") {
//   wish(projectUser.sayName() === "my name is name");
// } else {
//   wish(projectUser.sayTheName() === "the project name is name");
// }
