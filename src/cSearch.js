import { WeekDate } from './suppClasses'

function overlapConstraint(c1, c2)
{
  for (const e1 of c1.instances) {
    for (const e2 of c2.instances) {
      if ((WeekDate.compare(e1.start, e2.end) < 0) && (WeekDate.compare(e2.start, e1.end) < 0)) {
        return true
      }
    }
  }
}

export function makeDomain(eventOptions, domain)
{
  if ( typeof domain === 'undefined' )
    domain = new Map();

  let value = NaN;
  for (var c in eventOptions) {
    if (!domain.has(eventOptions[c].event.name)) {
      domain.set(eventOptions[c].event.name, [eventOptions[c],]);
    }
    else {
      value = domain.get(eventOptions[c].event.name);
      value.push(eventOptions[c]);
      domain.set(eventOptions[c].event.name, value);
    }
  }
  return domain
}

export function search(domain)
{
  if (Array.from(domain.values()).some(v => v.length === 0)) {
    return null
  }

  if (Array.from(domain.values()).every(v => v.length === 1)) {
    return [domain]
  }

  const keys = Array.from(domain.keys()).concat().sort(e => domain.get(e).length)
  const key = keys.filter(k => domain.get(k).length > 1)[0]
  let solutions = []

  for (const value of domain.get(key)) {
    const newDomain = new Map(domain)
    newDomain.set(key, [value])
    for (const key2 of keys.filter(k => k !== key)) {
      const tmp = []
      for (const c of newDomain.get(key2)) {
        if (!overlapConstraint(value, c))
          tmp.push(c)
      }
      newDomain.set(key2, tmp)
    }

    const s = search(newDomain)

    if (s != null) {
      solutions = solutions.concat(s)
    }
  }
  return solutions
}

