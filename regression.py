import numpy as np
from scipy.optimize import curve_fit
import matplotlib.pyplot as plt

def simple(X, a, b):
    A, B = X
    return a*A + b*B

def plusconstant(X, a, b, c):
    A, B = X
    return a*A + b*B + c

def ping_pong_bi_bi(X, KA, KB, Vmax):
    A, B = X
    return (Vmax*A*B)/(KA*B+KB*A+A*B)

def ordered_bi_bi(X, KA, KiA, KB, Vmax):
    A, B = X
    return (Vmax*A*B)/(KiA*KB+KA*B+KB*A+A*B)

A = np.linspace(0.1,1.1,101)
B = np.linspace(1.,2., 101)
a, b, c = 10., 4., 6.
z = simple((A,B), a, b) * 1 + np.random.random(101) / 100
z = plusconstant((A,B), a, b, c) * 1 + np.random.random(101) / 100

p0 = 8., 2.
popt, pcov = curve_fit(simple, (A,B), z, p0)
perr = np.sqrt(np.diag(pcov))
print(popt, perr)

# z = plusconstant((A,B), a, b, c) * 1 + np.random.random(101) / 100
# p0 = 8., 2., 6.
# popt, pcov = curve_fit(plusconstant, (A,B), z, p0)
# perr = np.sqrt(np.diag(pcov))
# print(popt, perr)

a, b = popt
x_data = np.array((A, B))
plt.plot(A, simple((A, B), *popt), label="A")
plt.plot(B, simple((A, B), *popt), label="B")
# plt.axis([0, 2, 0, 50])
plt.legend()
plt.show()
plt.savefig("temp.png")