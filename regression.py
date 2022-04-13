
import numpy as np
from scipy.optimize import curve_fit
import matplotlib.pyplot as plt
import io, base64

def simple(X, a, b):
    A, B = X
    return a*A + b*B

def uni_uni(X, KA, Vmax):
    A = X
    return (Vmax*A)/(KA+A)

def uni_uni_comp_inhib(X, KA, KI, Vmax):
    A, I = X
    return (Vmax*A)/((1+I/KI)*KA+A)

def ping_pong_bi_bi(X, KA, KB, Vmax):
    A, B = X
    return (Vmax*A*B)/(KA*B+KB*A+A*B)

def ordered_bi_bi(X, KA, KiA, KB, Vmax):
    A, B = X
    return (Vmax*A*B)/(KiA*KB+KA*B+KB*A+A*B)

def ordered_ter_ter(X, KA, KiA, KB, KiB, KC, Vmax):
    A, B, C = X
    return (Vmax*A*B*C)/(KiA*KiB*KC+KiA*KB*C+KiB*KC*A+KC*A*B+KB*A*C+KA*B*C+A*B*C)

def bi_uni_uni_uni_ping_pong(X, KA, KIA, KB, KC, Vmax):
    A, B, C = X
    return (Vmax*A*B*C)/(KIA*KB*C+KC*A*B+KB*A*C+KA*B*C+A*B*C)

A = np.array([2.,2.,2.,2.,2.,2.,4.,4.,4.,4.,4.,4.,8.,8.,8.,8.,8.,8.,16.,16.,16.,16.,16.,16.,32.,32.,32.,32.,32.,32.,64.,64.,64.,64.,64.,64.,128.,128.,128.,128.,128.,128.])
B = np.array([0.2,0.4,1.,2.,4.,8.,0.2,0.4,1.,2.,4.,8.,0.2,0.4,1.,2.,4.,8.,0.2,0.4,1.,2.,4.,8.,0.2,0.4,1.,2.,4.,8.,0.2,0.4,1.,2.,4.,8.,0.2,0.4,1.,2.,4.,8.])
v = np.array([7.83E-09,9.76E-09,1.14E-08,1.22E-08,1.25E-08,1.27E-08,1.06E-08,1.46E-08,1.87E-08,2.06E-08,2.17E-08,2.24E-08,1.30E-08,1.93E-08,2.72E-08,3.16E-08,3.43E-08,3.59E-08,1.46E-08,2.30E-08,3.54E-08,4.31E-08,4.83E-08,5.15E-08,1.55E-08,2.55E-08,4.16E-08,5.26E-08,6.07E-08,6.58E-08,1.60E-08,2.70E-08,4.56E-08,5.92E-08,6.96E-08,7.64E-08,1.63E-08,2.78E-08,4.79E-08,6.32E-08,7.52E-08,8.30E-08])
p0 = np.array([1,1,1,1])
popt, pcov = curve_fit(ordered_bi_bi, (A,B), v, p0)
perr = np.sqrt(np.diag(pcov))
print(popt, perr)

fig, ax = plt.subplots()
B = np.array([0.2,0.4,1.,2.,4.,8.])
A = np.array([2.,2.,2.,2.,2.,2.])
ax.plot(np.reciprocal(B), np.reciprocal([7.83E-09,9.76E-09,1.14E-08,1.22E-08,1.25E-08,1.27E-08]), 'o', c=(0.07717222375736865,0.6219587472451981,0.01381403440928386))
ax.plot(np.reciprocal(B), np.reciprocal(ordered_bi_bi((A,B), *popt)), c=(0.07717222375736865,0.6219587472451981,0.01381403440928386), label='A=2.')
A = np.array([4.,4.,4.,4.,4.,4.])
ax.plot(np.reciprocal(B), np.reciprocal([1.06E-08,1.46E-08,1.87E-08,2.06E-08,2.17E-08,2.24E-08]), 'o', c=(0.2643435127483281,0.7723137613958289,0.47723039571760717))
ax.plot(np.reciprocal(B), np.reciprocal(ordered_bi_bi((A,B), *popt)), c=(0.2643435127483281,0.7723137613958289,0.47723039571760717), label='A=4.')
A = np.array([8.,8.,8.,8.,8.,8.])
ax.plot(np.reciprocal(B), np.reciprocal([1.30E-08,1.93E-08,2.72E-08,3.16E-08,3.43E-08,3.59E-08]), 'o', c=(0.32022346035474347,0.6302206978896395,0.4948292629610511))
ax.plot(np.reciprocal(B), np.reciprocal(ordered_bi_bi((A,B), *popt)), c=(0.32022346035474347,0.6302206978896395,0.4948292629610511), label='A=8.')
A = np.array([16.,16.,16.,16.,16.,16.])
ax.plot(np.reciprocal(B), np.reciprocal([1.46E-08,2.30E-08,3.54E-08,4.31E-08,4.83E-08,5.15E-08]), 'o', c=(0.23389675658414355,0.44156930148867557,0.4136812687922923))
ax.plot(np.reciprocal(B), np.reciprocal(ordered_bi_bi((A,B), *popt)), c=(0.23389675658414355,0.44156930148867557,0.4136812687922923), label='A=16.')
A = np.array([32.,32.,32.,32.,32.,32.])
ax.plot(np.reciprocal(B), np.reciprocal([1.55E-08,2.55E-08,4.16E-08,5.26E-08,6.07E-08,6.58E-08]), 'o', c=(0.739952615311183,0.32516825536054594,0.5081639669413593))
ax.plot(np.reciprocal(B), np.reciprocal(ordered_bi_bi((A,B), *popt)), c=(0.739952615311183,0.32516825536054594,0.5081639669413593), label='A=32.')
A = np.array([64.,64.,64.,64.,64.,64.])
ax.plot(np.reciprocal(B), np.reciprocal([1.60E-08,2.70E-08,4.56E-08,5.92E-08,6.96E-08,7.64E-08]), 'o', c=(0.14403112849407207,0.027650794116078736,0.1997854987667118))
ax.plot(np.reciprocal(B), np.reciprocal(ordered_bi_bi((A,B), *popt)), c=(0.14403112849407207,0.027650794116078736,0.1997854987667118), label='A=64.')
A = np.array([128.,128.,128.,128.,128.,128.])
ax.plot(np.reciprocal(B), np.reciprocal([1.63E-08,2.78E-08,4.79E-08,6.32E-08,7.52E-08,8.30E-08]), 'o', c=(0.8648515543354991,0.4012297525548514,0.9435057917040722))
ax.plot(np.reciprocal(B), np.reciprocal(ordered_bi_bi((A,B), *popt)), c=(0.8648515543354991,0.4012297525548514,0.9435057917040722), label='A=128.')

ax.legend(fontsize='xx-small')
fig.savefig('temp')
np.array([popt, perr])