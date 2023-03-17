import { Component, OnInit } from '@angular/core'
import { FormArray, FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'ks-training-array',
  templateUrl: './training-array.component.html',
  styles: []
})
export class TrainingArrayComponent implements OnInit {
  _array: any = []
  _forResult: any = ''
  _methodResult: any = ''
  _spread: any = ''
  _simpleArray: any = []
  group: FormGroup = new FormGroup({
    array: new FormControl('[]')
  })

  ngOnInit(): void {
    this.group.controls['array'].valueChanges.subscribe((array) => {
      try {
        this._array = JSON.parse(array)
      } catch (e) {
        this._array = []
      }
    })
  }

  demoForEach(): void {
    // for
    console.time('for')
    for (let i = 0; i < this._array.length; i++) {
      console.log(`${i} ${this._array[i]}`)
    }
    console.timeEnd('for')
    // forEach
    console.time('forEach')
    this._array.forEach((v: string, i: number, a: string[]) => {
      console.log(`${i} ${v}`)
    })
    console.timeEnd('forEach')
  }

  demoIndexOf(): void {
    // for
    console.time('for')
    let find: number = -1
    for (let i = 0; i < this._array.length; i++) {
      if (this._array[i] === 'Nemo') {
        find = i
        break
      }
    }
    this._forResult = find
    console.timeEnd('for')
    // reduce
    console.time('indexOf')
    this._methodResult = this._array.indexOf('Nemo')
    console.timeEnd('indexOf')
  }

  demoLastIndexOf(): void {
    // for
    console.time('for')
    let find: number = -1
    for (let i = this._array.length - 1; i >= 0; i--) {
      if (this._array[i] === 'Nemo') {
        find = i
        break
      }
    }
    this._forResult = find
    console.timeEnd('for')
    // reduce
    console.time('lastIndexOf')
    this._methodResult = this._array.lastIndexOf('Nemo')
    console.timeEnd('lastIndexOf')
  }

  demoIncludes(): void {
    // for
    console.time('for')
    let find: boolean = false
    for (let i = 0; i < this._array.length; i++) {
      if (this._array[i] === 'Nemo') {
        find = true
        break
      }
    }
    this._forResult = find
    console.timeEnd('for')
    // find
    console.time('includes')
    this._methodResult = this._array.includes('Nemo')
    console.timeEnd('includes')
  }

  demoJoin(): void {
    // for
    console.time('for')
    let tmp = ''
    for (let i = 0; i < this._array.length; i++) {
      tmp += i === 0 ? this._array[i] : `-${this._array[i]}`
    }
    this._forResult = tmp
    console.timeEnd('for')
    // join
    console.time('join')
    this._methodResult = this._array.join('-')
    console.timeEnd('join')
  }

  demoFill(): void {
    // for
    console.time('for')
    const tmp = []
    for (let i = 0; i < this._array.length; i++) {
      tmp.push('fillValue')
    }
    this._forResult = tmp
    console.timeEnd('for')
    // join
    console.time('fill')
    this._methodResult = [...this._array].fill('fillValue')
    console.timeEnd('fill')
  }

  demoFlat(): void {
    // for
    console.time('for')
    const tmp: string[] = []
    const recursive = (list: any) => {
      for (let i = 0; i < list.length; i++) {
        if (Array.isArray(list[i])) {
          recursive(list[i])
        } else {
          tmp.push(list[i])
        }
      }
    }
    recursive(this._array)
    this._forResult = tmp
    console.timeEnd('for')
    // join
    console.time('flat')
    this._methodResult = this._array.flat()
    console.timeEnd('flat')
  }

  demoFlatMap(): void {
    // for
    console.time('for')
    const tmpMap: any[] = []
    for (let i = 0; i < this._array.length; i++) {
      tmpMap.push([this._array[i], this._array[i].toUpperCase()])
    }
    const tmp: string[] = []
    const recursive = (list: any) => {
      for (let i = 0; i < list.length; i++) {
        if (Array.isArray(list[i])) {
          recursive(list[i])
        } else {
          tmp.push(list[i])
        }
      }
    }
    recursive(tmpMap)
    this._forResult = tmp
    console.timeEnd('for')
    // join
    console.time('flatMap')
    this._methodResult = this._array.flatMap((v: string) => [
      v,
      v.toUpperCase()
    ])
    console.timeEnd('flatMap')
  }

  demoFind(): void {
    // for
    console.time('for')
    let find: number = -1
    for (let i = 0; i < this._array.length; i++) {
      if (this._array[i].name === 'Nemo') {
        find = i
        break
      }
    }
    if (find >= 0) {
      this._forResult = this._array[find]
    }
    console.timeEnd('for')
    // find
    console.time('find')
    this._methodResult = this._array.find(
      (v: { fish: string; name: string }) => v.name === 'Nemo'
    )
    console.timeEnd('find')
  }

  demoFindIndex(): void {
    // for
    console.time('for')
    let find: number = -1
    for (let i = 0; i < this._array.length; i++) {
      if (this._array[i].name === 'Nemo') {
        find = i
        break
      }
    }
    this._forResult = find
    console.timeEnd('for')
    // find
    console.time('findIndex')
    this._methodResult = this._array.findIndex(
      (v: { fish: string; name: string }) => v.name === 'Nemo'
    )
    console.timeEnd('findIndex')
  }

  demoEvery(): void {
    // for
    console.time('for')
    let every = true
    for (let i = 0; i < this._array.length; i++) {
      every = every && this._array[i].name.includes('Nemo')
    }
    this._forResult = every
    console.timeEnd('for')
    // every
    console.time('every')
    this._methodResult = this._array.every(
      (v: { fish: string; name: string }) => v.name.includes('Nemo')
    )
    console.timeEnd('every')
  }

  demoSome(): void {
    // for
    console.time('for')
    let every = false
    for (let i = 0; i < this._array.length; i++) {
      every = every || this._array[i].name.includes('Nemo')
    }
    this._forResult = every
    console.timeEnd('for')
    // every
    console.time('some')
    this._methodResult = this._array.some((v: { fish: string; name: string }) =>
      v.name.includes('Nemo')
    )
    console.timeEnd('some')
  }

  demoSort(): void {
    // for
    console.time('for')
    const tmp = [...this._array]
    for (let i = 0; i < tmp.length; i++) {
      for (let j = 0; j < tmp.length; j++) {
        if (tmp[j].name.localeCompare(tmp[j + 1]?.name, 'it') >= 0) {
          const copy = tmp[j]
          tmp[j] = tmp[j + 1]
          tmp[j + 1] = copy
        }
      }
    }
    this._forResult = tmp
    console.timeEnd('for')
    // sort
    console.time('sort')
    this._methodResult = [...this._array].sort(
      (a: { fish: string; name: string }, b: { fish: string; name: string }) =>
        a.name.localeCompare(b.name, 'it')
    )
    console.timeEnd('sort')
  }

  demoFilter(): void {
    // for
    console.time('for')
    const tmp = []
    for (let i = 0; i < this._array.length; i++) {
      this._array[i].name.includes('e') && tmp.push(this._array[i])
    }
    this._forResult = tmp
    console.timeEnd('for')
    // reduce
    console.time('filter')
    this._methodResult = this._array.filter(
      (v: { fish: string; name: string }) => v.name.includes('e')
    )
    console.timeEnd('filter')
  }

  demoReduce(): void {
    // for
    console.time('for')
    const tmp: { [key: string]: string[] } = {}
    for (let i = 0; i < this._array.length; i++) {
      if (!tmp[this._array[i].name.charAt(0)]) {
        tmp[this._array[i].name.charAt(0)] = []
      }
      tmp[this._array[i].name.charAt(0)].push(this._array[i])
    }
    this._forResult = tmp
    console.timeEnd('for')
    // reduce
    console.time('reduce')
    this._methodResult = this._array.reduce(
      (
        acc: { [key: string]: Array<{ fish: string; name: string }> },
        v: { fish: string; name: string }
      ) => {
        if (!acc[v.name.charAt(0)]) {
          acc[v.name.charAt(0)] = []
        }
        acc[v.name.charAt(0)].push(v)
        return acc
      },
      {}
    )
    console.timeEnd('reduce')
  }

  demoReduceRight(): void {
    // for
    console.time('for')
    let tmp: string = ''
    for (let i = this._array.length - 1; i >= 0; i--) {
      tmp += `-${this._array[i].name}`
    }
    this._forResult = tmp
    console.timeEnd('for')
    // reduce
    console.time('reduceRight')
    this._methodResult = this._array.reduceRight(
      (acc: string, v: { fish: string; name: string }) => `${acc}-${v.name}`,
      ''
    )
    console.timeEnd('reduceRight')
  }

  demoMap(): void {
    // for
    console.time('for')
    const tmp = []
    for (let i = 0; i < this._array.length; i++) {
      tmp.push({ ...this._array[i], position: i })
    }
    this._forResult = tmp
    console.timeEnd('for')
    // map
    console.time('map')
    this._methodResult = this._array.map(
      (v: { fish: string; name: string }, i: number) => ({ ...v, position: i })
    )
    console.timeEnd('map')
  }

  demoConcat(): void {
    const findDory: Array<{ fish: string; name: string }> = [
      {
        name: 'Hank',
        fish: 'Polpo'
      },
      {
        name: 'Destiny',
        fish: 'Squalo balena'
      },
      {
        name: 'Scorza',
        fish: 'Tartaruga'
      }
    ]
    // for
    console.time('for')
    const tmp = []
    for (let i = 0; i < this._array.length; i++) {
      tmp.push(this._array[i])
    }
    for (let i = 0; i < findDory.length; i++) {
      tmp.push(findDory[i])
    }
    this._forResult = tmp
    console.timeEnd('for')
    // concat
    console.time('concat')
    this._methodResult = this._array.concat(findDory)
    console.timeEnd('concat')
    // spread
    console.time('spread')
    this._spread = [...this._array, ...findDory]
    console.timeEnd('spread')
  }

  demoSlice(): void {
    // for
    console.time('for')
    const tmp = []
    for (let i = 0; i < 3; i++) {
      tmp.push(this._array[i])
    }
    this._forResult = tmp
    console.timeEnd('for')
    // map
    console.time('slice')
    this._methodResult = this._array.slice(1, 3)
    console.timeEnd('slice')
  }

  demoSplice(): void {
    // for
    console.time('for')
    const tmp = []
    for (let i = 0; i < 3; i++) {
      if (i !== 3) {
        tmp.push(this._array[i])
      }
    }
    this._forResult = tmp
    console.timeEnd('for')
    // map
    console.time('splice')
    this._methodResult = [...this._array].splice(3, 1)
    console.timeEnd('splice')
  }

  demoReverse(): void {
    // for
    console.time('for')
    const tmp = []
    for (let i = this._array.length - 1; i >= 0; i--) {
      tmp.push(this._array[i])
    }
    this._forResult = tmp
    console.timeEnd('for')
    // reverse
    console.time('reverse')
    this._methodResult = [...this._array].reverse()
    console.timeEnd('reverse')
  }

  demoCopyWithin(): void {
    // for
    console.time('for')
    const tmp = []
    for (let i = 0; i < 1; i++) {
      tmp.push(this._array[i])
    }
    for (let j = 3; j < this._array.length; j++) {
      tmp.push(this._array[j])
    }
    if (tmp.length < this._array.length) {
      for (let z = tmp.length; z < this._array.length; z++) {
        tmp.push(this._array[z])
      }
    }
    this._forResult = tmp
    console.timeEnd('for')
    // copyWithin
    console.time('copyWithin')
    this._methodResult = [...this._array].copyWithin(1, 3)
    console.timeEnd('copyWithin')
  }

  // [
  //   {
  //     "name": "Nemo",
  //     "fish": "Pagliaccio"
  //   },
  //   {
  //     "name": "Dory",
  //     "fish": "Chirurgo"
  //   },
  //   {
  //     "name": "Bloblò",
  //     "fish": "Chirurgo"
  //   },
  //   {
  //     "name": "Jacques",
  //     "fish": "Gambero"
  //   },
  //   {
  //     "name": "Gurgle",
  //     "fish": "Gramma"
  //   },
  //   {
  //     "name": "Deb",
  //     "fish": "Damigella"
  //   },
  //   {
  //     "name": "Peach",
  //     "fish": "Stella marina"
  //   },
  //   {
  //     "name": "Branchia",
  //     "fish": "Idolo"
  //   }
  // ]
  //  ["Nemo", "Dory","Jacques", "Gurgle","Deb","Peach","Branchia"]
}
