
var domain = new Map(); // {event1 : [option1, option2, ...], event2 : [option1, option2, ...]}
var constraints = []// [[event1, event2], [event3, event4], ...]

domain.set("event1", ["option1", "option2", "option3"]);
domain.set("event2", ["option4", "option5", "option6"]);
domain.set("event3", ["option7", "option8", "option9"]);
constraints.push(["event1","event2"]);
constraints.push(["event1","event3"]);
constraints.push(["event2","event3"]);

console.log(domain)
console.log(constraints)

console.log(constraintSearch(domain, constraints));


function mapIsEmpty(map){
	return Object.keys(map).length === 0 && map.constructor === Object;
}

// domains = map(event : [option1, option2, ...])
// constraints = [[event1, event2], [event1,event3], ...]
function constraintSearch(domains, constraints){
	var in_domains = new Map();

	if (mapIsEmpty(in_domains))
		in_domains = domains;

	// checks if there isnt a possible value for a key
	for (list of in_domains.values())
		if (list.length > 0)
			return null;

	// check if there is only one possible value for each key 
	all_single_value = true;
	for (list of in_domains.values()){
		if (list.length != 1){
			all_single_value = false;
			break;
		}
	}
	if (all_single_value){
		map_to_return = new Map();
		for (key of in_domains.keys())
			map_to_return.set(key, in_domains.get(key));
		return map_to_return;
	}

	// ... 
	var newdomains = new Map();
	var edges = [];
	var solution;

	for (key of domains.keys()){
		if (domains.get(key).length > 1){
			for (value in domains.get(key)){
				newdomains = Map(in_domains);
				newdomains.set(key, value);
				for (tuple of constraints)
					if (tuple[1] == key)
						edges.push([tuple[0],tuple[1]]);
				newdomains = constraint_propagation(newdomains, edges, constraints);
				solution = constraintSearch(newdomains);
				if (solution != null)
					return solution;
			}
			return null;
		}
	}
	return null;
}

function constraint_propagation(domains, edges, constraints){
	while (edges.length>0){
		var vars = edges[0];
		edges.splice(0,1);

		var domain = []
		var possible = false;
		for (x of domains.get(vars[0])){
			possible = false;
			for (y of domains.get(vars[1]))
				if (optionConstraint(vars[0], x, vars[1], y))
					possible = true;
			if (possible)
				domain.push(x)
		}
		if (domain.length < domains.get(vars[0].length)){
			domains.set(var1, domain);
			for (tuple of constraints){
				edges.push(tuple[0],tuple[1]);
			}
		}
	}
	return domains
}


function dateOverlaps(optionA, optionB){
	if(optionA == optionB)
		return false;
	return true;
	/*
	if (optionA.start <= optionB.start && optionB.start <= optionA.end)
		return true;
	if(optionA.start <= optionB.end && optionB.end <= optionA.end)
		return true;
	if(optionB.start < optionA.start && optionA.end < optionB.end)
		return true;
	return false;
	*/
}

function restrictionOverlaps(option, restrictions){
	for (restriction of restrictions)
		return date_overlaps(option, restriction);
}


function optionConstraint(eventA, optionA, eventB, optionB, restrictions){
	if(date_overlaps(optionA, optionB))
		return false;
	if(restrictions_overlaps(optionA, restrictions))
		return false;
	if(restrictions_overlaps(optionB, restrictions))
		return false;
	return true;
}