describe("Test app", function() {
    var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    By = webdriver.By,
    until = webdriver.until;
    
    xdescribe("First test", function(){
        beforeEach(function() {
            this.driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
        });

        it("First test - test ends before promise is fulfilled", function(){
            this.driver.get('https://www.google.com');
            this.driver.findElement(By.name('q')).sendKeys('webdriver');
            this.driver.findElement(By.name('btnG')).click();
            this.driver.wait(until.titleIs('webdriver - Google Search'), 1000);
            console.log("Done");
        });
        
        afterEach(function(){
            this.driver.quit();
        });
    });
    
    xdescribe("Async test without proper done call", function(){
        beforeEach(function(done) {
            this.driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
            done();
        });
        
        it("Test is done before promise is fulfilled", function(done){
            this.driver.get('https://www.google.com/ncr');
            this.driver.findElement(By.name('q')).sendKeys('webdriver');
            this.driver.findElement(By.name('btnG')).click();
            this.driver.wait(until.titleIs('webdriver - Google Search'), 1000);
            done();
        });
        
        afterEach(function(){
            this.driver.quit();
        });
    });
    
    xdescribe("Async test without done call", function(){
        beforeEach(function(done) {
            this.driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
            done();
        });
        
        it("Jasmine times out since done is not called", function(done){
            this.driver.get('https://www.google.com/ncr');
            this.driver.findElement(By.name('q')).sendKeys('webdriver');
            this.driver.findElement(By.name('btnG')).click();
            this.driver.wait(until.titleIs('webdriver - Google Search'), 1000);
            done();
        });
        
        afterEach(function(){
            this.driver.quit();
        });
    });
    
    xdescribe("Async test with proper done call", function(){
        beforeEach(function(done) {
            this.driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
            done();
        });
        
        it("Sometimes Jasmine times out before test is finished", function(done){
            this.driver.get('https://www.google.com/ncr');
            this.driver.findElement(By.name('q')).sendKeys('webdriver');
            this.driver.findElement(By.name('btnG')).click();
            this.driver.wait(until.titleIs('webdriver - Google Search'), 1000)
            .catch(function(e){
                console.log(e);
            })
            .finally(function(){
                done();
            })
        });
        
        afterEach(function(){
            this.driver.quit();
        });
    });

    xdescribe("Async test with proper done call and increased Jasmine timeout", function(){
        beforeEach(function(done) {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
            this.driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
            done();
        });
        
        it("Proper test", function(done){
            this.driver.get('https://www.google.com/ncr');
            //this.driver.findElement(By.name('q')).sendKeys('webdriver');
            this.driver.findElement(By.name('q')).then(function(e){
                e.sendKeys('webdriver');
            });
            this.driver.findElement(By.name('btnG')).click();
            this.driver.wait(until.titleIs('webdriver - Google Saearch'), 10000)
            .catch(function(e){
                console.log(e);
            })
            .finally(function(){
                // done();
                setTimeout(function() {
                    done();
                }, 10000);
            })
        });
        
        afterEach(function(){
            this.driver.quit();
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });
});
