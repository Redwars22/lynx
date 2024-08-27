#include <iostream>
#include <fstream>
#include <map>
#include <vector>
#include <sstream>

std::string src_code[9999];
std::vector <std::map <std::string, std::string>> tree;

void tokenize(std::string line);

void readSource(std::string);

std::string trim(const std::string &s)
{
    std::string::const_iterator it = s.begin();
    while (it != s.end() && isspace(*it))
        it++;

    std::string::const_reverse_iterator rit = s.rbegin();
    while (rit.base() != it && isspace(*rit))
        rit++;

    return std::string(it, rit.base());
}

int main(){
    readSource("example.lx");

    for(int i = 0; i < 9999; i++){
        if(src_code[i].length() > 0){
            src_code[i] = trim(src_code[i]);

            tokenize(src_code[i]);
        }
    }

    return 0;
}

void tokenize(std::string line){
    std::string _line = line;
    std::stringstream line_tok(_line);
    std::string tok;
    std::vector<std::string> tokenz = {};
    char delimiter = ' ';

    while (getline(line_tok, tok, delimiter)) { 
        tokenz.push_back(tok);
    }

    for(const std::string _tok : tokenz){
        std::cout << _tok << std::endl;
    }

    tree.push_back(("a","b"));

    //getKindOfToken();
}

void readSource(std::string filename){
    std::fstream src;
    src.open(filename, std::ios::in);

    if(src.is_open()){
        std::string line;

        int pos = 0;

        while(std::getline(src, line)){
            //std::cout << line << std::endl;
            src_code[pos] = line;
            pos++;
        }

        src.close();
    }
}