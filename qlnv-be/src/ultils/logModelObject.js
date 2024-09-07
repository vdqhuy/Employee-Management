export function LogModelObject(modelsValues) {
    let data = JSON.parse(JSON.stringify(modelsValues, null, 4));
    console.log(data);
}