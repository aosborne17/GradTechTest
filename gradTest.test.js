function createMenuData(data) {

    //JSON DATA TO BE MATCHED WITH TEST CASE

  // creating three empty variables that cannot be reassigned
  const parentJSON = [];
  const parentData = [];
  const childrenData = [];
  // setting a boolean 
  var duplicate = false;
  for(let x = 0; x < data.length; ++x){
	  duplicate = false;
	  // splitting the strings in the array at the "/"
	  parsedData = data[x].split("/")
	  //SEARCH FOR DUPLICATE PARENTDATA
	  for(let x = 0; x < parentData.length; ++x){
		  if(parsedData[0] == parentData[x]){
			  duplicate = true;
		}
	  }
	  if(!duplicate){
		  parentData.push(parsedData[0])
	  }
	  if(parsedData[1] != undefined){
		  childrenData.push(parsedData[0])
	  }
	}

	//GET UNIQUE CHILDREN
	var uniqueSet = new Set(childrenData); 
	var uniqueChildren = Array.from(uniqueSet); 


	var count = 0;
	var childCount = 0;
	var childName = "";
	var childArr = [];
	for(let x = 0; x < uniqueChildren.length; ++x){
		for(let y = 0; y < childrenData.length; ++y){
			if(childrenData[y] == uniqueChildren[x]){	
				++count;	
			}
		}
		for(let z = 0; z < count; ++z){
			childName = uniqueChildren[x] + "child" + ((z > 0) ? z + 1 : "");
			childArr.push(childName);
		}	
		parentJSON[x] = { title: uniqueChildren[x], data: childArr }; //INSERTING PARENTS NAMES INTO JSON
		count = 0;
		childArr = [];
	}
	
	return parentJSON;

}


describe("menu Data Generator", () => {
    it("creates correct data structure ", () => {
      const data = [
        "parent1/parent1child",
        "parent1/parent1child2",
        "parent2/parent2child",
        "parent2/parent2child2",
        "parent1/parent1child3",
        "parent3",
        "parent3/parent3child1",
        "parent4"
      ];
  
      const expectedResult = [
        {
          title: "parent1",
          data: ["parent1child", "parent1child2", "parent1child3"]
        },
        { title: "parent2", data: ["parent2child", "parent2child2"] },
        { title: "parent3", data: ["parent3child1"] }
      ];
  
      const actualResult = createMenuData(data);
      expect(actualResult).toMatchObject(expectedResult);
    });
  });