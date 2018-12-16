import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { entry } from './classes/entry';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  inputTxt: string;
  outputTxt: string;
  showOutput: boolean;
  allowedCategories: string[];
  outputCategories: entry[];

  ngOnInit(): void {
    this.allowedCategories = environment.allowedCategories.split(" ");
    this.allowedCategories = this.allowedCategories.filter(x => x != "");
    this.onReset();
  }

  onReset(): void {
    this.inputTxt = "";
    this.outputTxt = "";
    this.showOutput = false;
    this.outputCategories = [];
  }

  onProcess(): void {
    try {
      var inputCategories = JSON.parse(this.formattingInputTxt(this.inputTxt));

      this.filteringCategories(inputCategories);

      this.formatOutput();
    }
    catch(e) {
      this.outputTxt = "Something bad happened, please look into the console for more details...";
      console.log(e);
    }
    finally{
      this.showOutput = !this.showOutput; 
    } 
  }

  filteringCategories(inputCategories: any): void {
    Object.keys(inputCategories).forEach(key => {
      var tempEntry = inputCategories[key];
      if(this.allowedCategories.find(x => x.toUpperCase() === tempEntry.category.toUpperCase())){
        if(!this.outputCategories.find(x => x.subcategory.toUpperCase() === tempEntry.subcategory.toUpperCase())){
          this.outputCategories.push(tempEntry);
        }
      }
    });
  }

  formatOutput(): void {
    this.outputTxt = "CATEGORY     COUNT\n";

    this.outputTxt = this.outputTxt + this.formatOccurrences() + "\n";

    Object.keys(this.outputCategories).forEach(key => {
      this.outputTxt = this.outputTxt + this.outputCategories[key].category +
                       " " + this.outputCategories[key].subcategory + "\n";
    });
  }

  formatOccurrences(): string {
    var counts = {};

    for (var i = 0; i < this.outputCategories.length; i++) {
      var num = this.outputCategories[i];
      counts[num.category] = counts[num.category] ? counts[num.category] + 1 : 1;
    }

    var occurrences = JSON.parse(this.formattingCounterObj(counts));
    occurrences = occurrences.sort((a: { occurrences: number; }, b: { occurrences: number; }) => {
      return b.occurrences - a.occurrences;
    });

    return this.formattingOccurrencesTxt(occurrences);
  }

  formattingInputTxt(inputTxt: string): string {
    var formatedInputTxt = inputTxt.replace(/:/g, ', "subcategory":');
    formatedInputTxt = formatedInputTxt.replace(/{/g, '{"category":');

    return formatedInputTxt;
  }

  formattingCounterObj(counter: any): string{
    var countsTxt = JSON.stringify(counter);
    countsTxt = countsTxt.replace(/{/g, '[{');
    countsTxt = countsTxt.replace(/}/g, '}]');
    countsTxt = countsTxt.replace(/,/g, '},{');
    countsTxt = countsTxt.replace(/:/g, ', "occurrences":');
    countsTxt = countsTxt.replace(/{/g, '{"category":');

    return countsTxt;
  }

  formattingOccurrencesTxt(occurrences: any): string {
    var occurrencesTxt = "";

    Object.keys(occurrences).forEach(key => {
      occurrencesTxt = occurrencesTxt + occurrences[key].category +
                      this.calculateEmptySpaces(occurrences[key].category) +
                      occurrences[key].occurrences + "\n"
    });

    return occurrencesTxt;
  }

  calculateEmptySpaces(category: string): string {
    var categoryCharsQty = category.length;
    var magicNumber = 13 - categoryCharsQty;
    return " ".repeat(magicNumber);
  }

  disableProcessBtn(): boolean {
    return (this.inputTxt == "" || this.inputTxt == null);
  }
}
