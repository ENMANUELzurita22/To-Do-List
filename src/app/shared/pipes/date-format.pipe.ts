import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: "dateFormat",
    standalone: false,
})
export class DateFormatPipe implements PipeTransform {
    transform(value: Date | any): string {
        if (!value) return "";

        if (value && typeof value.toDate === "function"){
            value = value.toDate();
        }

        if (typeof value === "string") {
            value = new Date(value);
        }

        const date = new Date(value);
        return date. toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric"
        })
    }
}