import numpy as np
from scipy.optimize import curve_fit
import matplotlib.pyplot as plt

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
print(np.reciprocal(B))
ax.plot(np.reciprocal(B), np.reciprocal([7.83E-09,9.76E-09,1.14E-08,1.22E-08,1.25E-08,1.27E-08]), 'o', c=(0.892974068735356,0.6688433251378592,0.9496118563105268))
ax.plot(np.reciprocal(B), np.reciprocal(ordered_bi_bi((A,B), *popt)), c=(0.892974068735356,0.6688433251378592,0.9496118563105268))
A = np.array([4.,4.,4.,4.,4.,4.])
ax.plot(np.reciprocal(B), np.reciprocal([1.06E-08,1.46E-08,1.87E-08,2.06E-08,2.17E-08,2.24E-08]), marker='o', c=(0.8823867062819264,0.31493309980770934,0.11689643055644106))
ax.plot(np.reciprocal(B), np.reciprocal(ordered_bi_bi((A,B), *popt)), c=(0.8823867062819264,0.31493309980770934,0.11689643055644106))
A = np.array([8.,8.,8.,8.,8.,8.])
ax.plot(np.reciprocal(B), np.reciprocal([1.30E-08,1.93E-08,2.72E-08,3.16E-08,3.43E-08,3.59E-08]), marker='o', c=(0.23526723496155266,0.4469441427858475,0.342541646417604))
ax.plot(np.reciprocal(B), np.reciprocal(ordered_bi_bi((A,B), *popt)), c=(0.23526723496155266,0.4469441427858475,0.342541646417604))
A = np.array([16.,16.,16.,16.,16.,16.])
ax.plot(np.reciprocal(B), np.reciprocal([1.46E-08,2.30E-08,3.54E-08,4.31E-08,4.83E-08,5.15E-08]), marker='o', c=(0.7440325954681948,0.8130773502914933,0.7771828400060059))
ax.plot(np.reciprocal(B), np.reciprocal(ordered_bi_bi((A,B), *popt)), c=(0.7440325954681948,0.8130773502914933,0.7771828400060059))
A = np.array([32.,32.,32.,32.,32.,32.])
ax.plot(np.reciprocal(B), np.reciprocal([1.55E-08,2.55E-08,4.16E-08,5.26E-08,6.07E-08,6.58E-08]), marker='o', c=(0.3446355390676983,0.8900156432804531,0.09363230292182512))
ax.plot(np.reciprocal(B), np.reciprocal(ordered_bi_bi((A,B), *popt)), c=(0.3446355390676983,0.8900156432804531,0.09363230292182512))
A = np.array([64.,64.,64.,64.,64.,64.])
ax.plot(np.reciprocal(B), np.reciprocal([1.60E-08,2.70E-08,4.56E-08,5.92E-08,6.96E-08,7.64E-08]), marker='o', c=(0.7919921037559792,0.5174842980143218,0.40447349179510217))
ax.plot(np.reciprocal(B), np.reciprocal(ordered_bi_bi((A,B), *popt)), c=(0.7919921037559792,0.5174842980143218,0.40447349179510217))
A = np.array([128.,128.,128.,128.,128.,128.])
ax.plot(np.reciprocal(B), np.reciprocal([1.63E-08,2.78E-08,4.79E-08,6.32E-08,7.52E-08,8.30E-08]), marker='o', c=(0.8491192936359016,0.6392102614849006,0.6269461419765457))
ax.plot(np.reciprocal(B), np.reciprocal(ordered_bi_bi((A,B), *popt)), c=(0.8491192936359016,0.6392102614849006,0.6269461419765457))


fig.savefig('temp')
np.array([popt, perr])