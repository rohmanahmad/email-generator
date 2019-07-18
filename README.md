# Email Generator (For Testing Purpose)

### Installation:
```bash
    git clone https://github.com/rohmanahmad/email-generator.git
```
```bash
    cd email-generator && npm i
```


### Testing
```bash
    npm run test
```

### Usage
```bash
    node index.js --fname="First Name" --lname="Last Name"
```

### Test Result

```sh
  Generator Test
    #generate {fname: "anjani"}
      ✓ should return "anjani@kalimat.ai"
    #generate {fname: "Yusuke", lname: "Iseya"}
      ✓ should return "yusuke.iseya@kalimat.ai"
    #generate {fname: "Stephan Danu", lname: "Shakalakalaka"}
      ✓ should return "stephan.shakalakalaka@kalimat.ai"
    #generate {fname: "Akhmad", lname: "Abdul Rohman"}
      ✓ should return "akhmad.rohman@kalimat.ai"
    #generate {fname: "yunus"}
      ✓ should return "yunus@kalimat.ai"

  Duplicate Test
    #generate {fname: "yunus"}
      ✓ should return "yunus1@kalimat.ai"
    #generate {fname: "yunus"}
      ✓ should return "yunus2@kalimat.ai"
    #generate {fname: "yunus"}
      ✓ should return "yunus3@kalimat.ai"

  8 passing (46ms)
```