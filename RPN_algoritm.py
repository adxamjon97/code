def getP(t):
    if t in '*/': return 3
    if t in '+-': return 2
    if t in '(':  return 1
    if t in ')':  return -1
    return 0
    
def expr(e):
    cur = ''
    stc = []
    
    pro = 0
    for i in e:
        pro = getP(i)
        
        if pro==0: cur+=i
        if pro==1: stc+=i
        
        if pro>1:
            cur+=' '
            while stc and getP(stc[-1]) >= pro: 
                cur+=stc.pop()
            stc+=[i]
            
        if pro==-1:
            cur+=' '
            
            while getP(stc[-1])!=1: 
                cur+=stc.pop() 
                 
            stc.pop()  
    
    while stc: 
        cur+=stc.pop()
        
    return cur

def eve(r):
    op = ''
    stc = []
    
    i=0
    while i<len(r):
        if r[i]==' ':
            i+=1
            continue
            
        if getP(r[i])==0:
            while r[i]!=' ' and getP(r[i])==0:
                op+=r[i]
                i+=1
                
                if i==len(r): 
                    break
            if op:
                stc+=[float(op)]
            op=''
            
        if getP(r[i])>1:
            a = stc.pop()
            b = stc.pop()
            
            if r[i]=="+": stc+=[a+b]
            if r[i]=="*": stc+=[a*b]
            if r[i]=="-": stc+=[a-b]
            if r[i]=="/": stc+=[a/b]
            
        i+=1
            
    return stc[0]

s=input()
e=expr(s)
r=eve(e)

print(e)
print(r)
