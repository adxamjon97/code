package uz.adxamjon.easycalc;

import java.util.Stack;

public class RPN {
    public static int getPriority(char t) {
        if(t == '*' || t == '/') return 3;
        if(t == '+' || t == '-') return 2;
        if(t == '(')             return 1;
        if(t == ')')             return -1;
        return 0;
    }

    public static String convertToPostfix(String expression) {
        StringBuilder postfix = new StringBuilder();
        Stack<Character> stack = new Stack<>();

        for (char token : expression.toCharArray()) {
            int priority = getPriority(token);

            if      (priority == 0) postfix.append(token);
            else if (priority == 1) stack.push(token);
            else if (priority > 1) {
                postfix.append(' ');

                while (!stack.isEmpty() && getPriority(stack.peek()) >= priority)
                    postfix.append(stack.pop());

                stack.push(token);
            } else if (priority == -1) {
                postfix.append(' ');

                while (getPriority(stack.peek()) != 1)
                    postfix.append(stack.pop());

                stack.pop();
            }
        }

        while (!stack.isEmpty())
            postfix.append(stack.pop());

        return postfix.toString();
    }

    public static double evaluatePostfix(String postfix) {
        StringBuilder op = new StringBuilder();
        Stack<Double> stack = new Stack<>();

        for (int i=0; i<postfix.length(); ++i) {
            if(postfix.charAt(i) == ' ') continue;

            if (getPriority(postfix.charAt(i)) == 0) {
                while (postfix.charAt(i) != ' ' && getPriority(postfix.charAt(i)) == 0) {
                    op.append(postfix.charAt(i++));

                    if (i == postfix.length()) break;
                }

                if (op.length() > 0)
                    stack.push(Double.parseDouble(op.toString()));

                op = new StringBuilder();
            }

            if(getPriority(postfix.charAt(i))>1){
                double b = stack.pop();
                double a = stack.pop();

                switch (postfix.charAt(i)) {
                    case '+': stack.push(a + b); break;
                    case '-': stack.push(a - b); break;
                    case '*': stack.push(a * b); break;
                    case '/': stack.push(a / b); break;
                }
            }
        }

        return stack.pop();
    }
}
