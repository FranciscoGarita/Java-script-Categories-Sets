import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let input: string;
  let errorMsg: string;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
      imports:[
        FormsModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
    
    input = "\[" +
    "{\"PERSON\":\"Bob Jones\"}," +
    "{\"PLACE\":\"Washington\"}," +
    "{\"PERSON\":\"Mary\"}," +
    "{\"COMPUTER\":\"Mac\"}," +
    "{\"PERSON\":\"Bob Jones\"}," +
    "{\"OTHER\":\"Tree\"}," +
    "{\"ANIMAL\":\"Dog\"}," +
    "{\"PLACE\":\"Texas\"}," +
    "{\"FOOD\":\"Steak\"}," +
    "{\"ANIMAL\":\"Cat\"}" +
    "\]";

    errorMsg = "Something bad happened, please look into the console for more details...";
    });

  it("should read from the environment file", () => {
    comp.ngOnInit();
    expect(comp.allowedCategories.length).toEqual(5);
  });

  it("should reset values for some input/output variables", () => {
    comp.inputTxt = "inputTxt";
    comp.outputTxt = "outputTxt";
    comp.showOutput = true;
    comp.onReset();
    expect(comp.inputTxt).toEqual("");
    expect(comp.outputTxt).toEqual("");
    expect(comp.showOutput).toEqual(false);
  });

  it("should filter the repeated and the ilegal categories", () => {
    var inputCategories = JSON.parse(comp.formattingInputTxt(input));
    comp.filteringCategories(inputCategories);
    expect(comp.outputCategories.length).toEqual(8);
  });

  it("should format the output to meet expectations", () => {
    comp.outputTxt = "";
    spyOn(comp, "formatOccurrences").and.callThrough();
    var inputCategories = JSON.parse(comp.formattingInputTxt(input));
    comp.filteringCategories(inputCategories);
    comp.formatOutput();
    expect(comp.formatOccurrences).toHaveBeenCalled();
    expect(comp.outputTxt).not.toEqual("");
  });

  it("should format and sort the occurrences per category", () => {
    var formatedOccurrences = "";
    spyOn(comp, "formattingCounterObj").and.callThrough();
    spyOn(comp, "formattingOccurrencesTxt").and.callThrough();
    var inputCategories = JSON.parse(comp.formattingInputTxt(input));
    comp.filteringCategories(inputCategories);
    formatedOccurrences = comp.formatOccurrences();
    expect(comp.formattingCounterObj).toHaveBeenCalled();
    expect(comp.formattingOccurrencesTxt).toHaveBeenCalled();
    expect(formatedOccurrences).not.toEqual("");
  });

  it("should format the input text to make it easier to handle", () => {
    var formattedInputTxt: string;
    formattedInputTxt = comp.formattingInputTxt(input);
    expect(formattedInputTxt).not.toEqual(input);
  });

  it("should calculate the amount of empty spaces in order to simulate a column", () => {
    var category: string = "PERSON";
    var calculatedSpace: string = ""
    calculatedSpace = comp.calculateEmptySpaces(category);
    expect(calculatedSpace).toEqual("       ");
  });

  it("should enable the process buton if the input is not empty", () => {
    comp.inputTxt = input;
    var isDisable: boolean = comp.disableProcessBtn();
    expect(isDisable).toEqual(false);
  });

  it("should disable the process buton if the input is empty", () => {
    comp.inputTxt = "";
    var isDisable: boolean = comp.disableProcessBtn();
    expect(isDisable).toEqual(true);
  });

  it("should process a valid JSON txt", () => {
    comp.inputTxt = input;
    comp.showOutput = false;
    comp.onProcess();
    expect(comp.showOutput).toEqual(true);
    expect(comp.outputTxt).not.toEqual(errorMsg);
  });

  it("should not process an invalid JSON txt", () => {
    comp.inputTxt = "[Invalid:JSON]";
    comp.showOutput = false;
    comp.onProcess();
    expect(comp.showOutput).toEqual(true);
    expect(comp.outputTxt).toEqual(errorMsg);
  });
  
});
