import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonUtilService {

  constructor() { }
  parse<T>(str: string, default_value: T) {
		var result: T = default_value;
		try {
			result = JSON.parse(str);
		} catch (e) {
			result = default_value;
		}
		return result;
	}
  stringify(obj: any) {
		let cache: Array<any> | null = [];
		const retVal = JSON.stringify(obj, (key, value) =>
			typeof value === "object" && value !== null
				? cache!.includes(value)
					? undefined // Duplicate reference found, discard key
					: cache!.push(value) && value // Store value in our collection
				: value
		);
		cache = null;
		return retVal;
	}
}
