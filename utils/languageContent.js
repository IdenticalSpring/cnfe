const languageContent = {
  python: `def example(word: str) -> str:
    # Your code here`,
  javascript: `/**
 * @param {string} word
 * @return {string}
 */
var example = function(word) {
    // Your code here
};`,
  c: `#include <stdio.h>
#include <string.h>

char* example(char* word) {
    // Your code here
    return "";
}`,
  csharp: `using System;

public class Solution {
    public string Example(string word) {
        // Your code here
    }
}`,
  java: `public class Solution {
    public String example(String word) {
        // Your code here
    }
}`,
  dart: `String example(String word) {
    // Your code here
    return "";
}`,
  php: `<?php
function example($word) {
    // Your code here
}`,
  ruby: `def example(word)
    # Your code here
end`,
  typescript: `function example(word: string): string {
    // Your code here
};`,
  kotlin: `fun example(word: String): String {
    // Your code here
}`,
  lua: `function example(word)
    -- Your code here
end`,
  cpp: `#include <string>
using namespace std;

string example(string word) {
    // Your code here
    return "";
}`,
  assembly: `; Assembly example
example:
    ; Your code here`,
};

export default languageContent;
