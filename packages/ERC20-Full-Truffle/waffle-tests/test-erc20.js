const { assertRevert } = require('./helpers/assertRevert');
const { assert} = require('chai');
const { web3 } = require ('web3');
const {solidity, createMockProvider, deployContract, getWallets} = require('ethereum-waffle');
const EIP20Abstraction = require('../build/EIP20.json');

describe('EIP20', () => {
  let accounts
  let HST

  before(async () => {
    provider = await createMockProvider()
    accounts = getWallets(provider)
  })

  beforeEach(async () => {
    HST = await deployContract(accounts[0], EIP20Abstraction, [10000, 'Simon Bucks', 1, 'SBX']);
  });

  it('creation: should create an initial balance of 10000 for the creator', async () => {
    const balance = await HST.balanceOf(accounts[0].address);
    assert.strictEqual(balance.toString(), '10000');
  });

  it('creation: test correct setting of vanity information', async () => {
    const name = await HST.name();
    assert.strictEqual(name, 'Simon Bucks');

    const decimals = await HST.decimals();
    assert.strictEqual(decimals.toString(), '1');

    const symbol = await HST.symbol();
    assert.strictEqual(symbol, 'SBX');
  });

  it('creation: should succeed in creating over 2^256 - 1 (max) tokens', async () => {
    // 2^256 - 1
    const HST2 = await deployContract(accounts[0], EIP20Abstraction, ['115792089237316195423570985008687907853269984665640564039457584007913129639935', 'Simon Bucks', 1, 'SBX']);
    const totalSupply = await HST2.totalSupply();
    assert.strictEqual(totalSupply.toString(), '115792089237316195423570985008687907853269984665640564039457584007913129639935');
  });

  // TRANSERS
  // normal transfers without approvals
  //TODO get this test working
  // it('transfers: ether transfer should be reversed.', async () => {
  //   const balanceBefore = await HST.balanceOf(accounts[0].address);
  //   assert.strictEqual(balanceBefore.toString(), '10000');

  //   await assertRevert(new Promise((resolve, reject) => {
  //     web3.eth.sendTransaction({ from: accounts[0], to: HST.address, value: web3.utils.toWei('10', 'Ether') }, (err, res) => {
  //       if (err) { reject(err); }
  //       resolve(res);
  //     });
  //   }));

  //   const balanceAfter = await HST.balanceOf(accounts[0].address);
  //   assert.strictEqual(balanceAfter.toString(), '10000');
  // });

  it('transfers: should transfer 10000 to accounts[1] with accounts[0] having 10000', async () => {
    await HST.transfer(accounts[1].address, 10000);
    const balance = await HST.balanceOf(accounts[1].address);
    assert.strictEqual(balance.toString(), '10000');
  });

  it('transfers: should fail when trying to transfer 10001 to accounts[1] with accounts[0] having 10000', async () => {
    await assertRevert(HST.transfer(accounts[1].address, 10001));
  });

  it('transfers: should handle zero-transfers normally', async () => {
    assert(await HST.transfer(accounts[1].address, 0), 'zero-transfer has failed');
  });

  // NOTE: testing uint256 wrapping is impossible since you can't supply > 2^256 -1
  // todo: transfer max amounts

  // TODO: fix the {from: address[1]} doing the following to set the sender:
  //   const methodId: string = ethereumjsAbi
  //   .methodID('ovmSSTORE', [])
  //   .toString('hex')

  // const data = `0x${methodId}${remove0x(ONE_FILLED_BYTES_32)}${remove0x(
  //   TWO_FILLED_BYTES_32
  // )}`

  // // Now actually apply it to our execution manager
  // const tx = await wallet.sendTransaction({
  //   to: executionManager.address,
  //   data,
  //   gasLimit,
  // })

  // // APPROVALS
  // it('approvals: msg.sender should approve 100 to accounts[1]', async () => {
  //   await HST.approve(accounts[1].address, 100);
  //   const allowance = await HST.allowance(accounts[0].address, accounts[1].address);
  //   assert.strictEqual(allowance.toString(), '100');
  // });

  // // bit overkill. But is for testing a bug
  // it('approvals: msg.sender approves accounts[1] of 100 & withdraws 20 once.', async () => {
  //   const balance0 = await HST.balanceOf(accounts[0].address);
  //   assert.strictEqual(balance0.toString(), '10000');

  //   await HST.approve(accounts[1].address, 100); // 100
  //   const balance2 = await HST.balanceOf(accounts[2].address);
  //   assert.strictEqual(balance2.toString(), '0', 'balance2 not correct');

  //   await HST.transferFrom(accounts[0].address, accounts[2].address, 20, { from: accounts[1] });
  //   await HST.allowance(accounts[0].address, accounts[1].address);
  //   await HST.transferFrom(accounts[0].address, accounts[2].addres, 20, { from: accounts[1] }); // -20
  //   const allowance01 = await HST.allowance(accounts[0].address, accounts[1].address);
  //   assert.strictEqual(allowance01.toString(), '80'); // =80

  //   const balance22 = await HST.balanceOf(accounts[2].address);
  //   assert.strictEqual(balance22.toString(), '20');

  //   const balance02 = await HST.balanceOf(accounts[0].address);
  //   assert.strictEqual(balance02.toString(), '9980');
  // });

  // // should approve 100 of msg.sender & withdraw 50, twice. (should succeed)
  // it('approvals: msg.sender approves accounts[1] of 100 & withdraws 20 twice.', async () => {
  //   await HST.approve(accounts[1], 100);
  //   const allowance01 = await HST.allowance(accounts[0].address, accounts[1].address);
  //   assert.strictEqual(allowance01.toString(), '100');

  //   await HST.transferFrom(accounts[0].address, accounts[2].address, 20, { from: accounts[1] });
  //   const allowance012 = await HST.allowance(accounts[0].address, accounts[1].address);
  //   assert.strictEqual(allowance012.toString(), '80');

  //   const balance2 = await HST.balanceOf(accounts[2].address);
  //   assert.strictEqual(balance2.toString(), '20');

  //   const balance0 = await HST.balanceOf(accounts[0].address);
  //   assert.strictEqual(balance0.toString(), '9980');

  //   // FIRST tx done.
  //   // onto next.
  //   await HST.transferFrom(accounts[0].address, accounts[2].address, 20, { from: accounts[1] });
  //   const allowance013 = await HST.allowance(accounts[0].address, accounts[1].address);
  //   assert.strictEqual(allowance013.toString(), '60');

  //   const balance22 = await HST.balanceOf(accounts[2].address);
  //   assert.strictEqual(balance22.toString(), '40');

  //   const balance02 = await HST.balanceOf(accounts[0].address);
  //   assert.strictEqual(balance02.toString(), '9960');
  // });

  // // should approve 100 of msg.sender & withdraw 50 & 60 (should fail).
  // it('approvals: msg.sender approves accounts[1] of 100 & withdraws 50 & 60 (2nd tx should fail)', async () => {
  //   await HST.approve(accounts[1], 100, { from: accounts[0] });
  //   const allowance01 = await HST.allowance.call(accounts[0], accounts[1]);
  //   assert.strictEqual(allowance01.toNumber(), 100);

  //   await HST.transferFrom(accounts[0], accounts[2], 50, { from: accounts[1] });
  //   const allowance012 = await HST.allowance.call(accounts[0], accounts[1]);
  //   assert.strictEqual(allowance012.toNumber(), 50);

  //   const balance2 = await HST.balanceOf.call(accounts[2]);
  //   assert.strictEqual(balance2.toNumber(), 50);

  //   const balance0 = await HST.balanceOf.call(accounts[0]);
  //   assert.strictEqual(balance0.toNumber(), 9950);

  //   // FIRST tx done.
  //   // onto next.
  //   await assertRevert(HST.transferFrom.call(accounts[0], accounts[2], 60, { from: accounts[1] }));
  // });

  // it('approvals: attempt withdrawal from account with no allowance (should fail)', async () => {
  //   await assertRevert(HST.transferFrom.call(accounts[0], accounts[2], 60, { from: accounts[1] }));
  // });

  // it('approvals: allow accounts[1] 100 to withdraw from accounts[0]. Withdraw 60 and then approve 0 & attempt transfer.', async () => {
  //   await HST.approve(accounts[1], 100, { from: accounts[0] });
  //   await HST.transferFrom(accounts[0], accounts[2], 60, { from: accounts[1] });
  //   await HST.approve(accounts[1], 0, { from: accounts[0] });
  //   await assertRevert(HST.transferFrom.call(accounts[0], accounts[2], 10, { from: accounts[1] }));
  // });

  // it('approvals: approve max (2^256 - 1)', async () => {
  //   await HST.approve(accounts[1], '115792089237316195423570985008687907853269984665640564039457584007913129639935', { from: accounts[0] });
  //   const allowance = await HST.allowance(accounts[0], accounts[1]);
  //   assert.strictEqual(allowance.toString(), '115792089237316195423570985008687907853269984665640564039457584007913129639935');
  // });

  // // should approve max of msg.sender & withdraw 20 without changing allowance (should succeed).
  // it('approvals: msg.sender approves accounts[1] of max (2^256 - 1) & withdraws 20', async () => {
  //   const balance0 = await HST.balanceOf.call(accounts[0]);
  //   assert.strictEqual(balance0.toNumber(), 10000);

  //   const max = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
  //   await HST.approve(accounts[1], max, { from: accounts[0] });
  //   const balance2 = await HST.balanceOf.call(accounts[2]);
  //   assert.strictEqual(balance2.toNumber(), 0, 'balance2 not correct');

  //   await HST.transferFrom(accounts[0], accounts[2], 20, { from: accounts[1] });
  //   const allowance01 = await HST.allowance.call(accounts[0], accounts[1]);
  //   assert.strictEqual(allowance01.toString(), max);

  //   const balance22 = await HST.balanceOf.call(accounts[2]);
  //   assert.strictEqual(balance22.toNumber(), 20);

  //   const balance02 = await HST.balanceOf.call(accounts[0]);
  //   assert.strictEqual(balance02.toNumber(), 9980);
  // });

  /* eslint-disable no-underscore-dangle */
  it('events: should fire Transfer event properly', async () => {
    const res = await HST.transfer(accounts[1].address, '2666');
    const receipt = await provider.getTransactionReceipt(res.hash)
    assert.strictEqual(`0x${receipt.logs[0].topics[1].slice(26).toLowerCase()}`, accounts[0].address.toLowerCase());
    assert.strictEqual(`0x${receipt.logs[0].topics[2].slice(26).toLowerCase()}`, accounts[1].address.toLowerCase());
    assert.strictEqual(parseInt(receipt.logs[0].data), 2666);
  });

  it('events: should fire Transfer event normally on a zero transfer', async () => {
    const res = await HST.transfer(accounts[1].address, '0');
    const receipt = await provider.getTransactionReceipt(res.hash)
    assert.strictEqual(`0x${receipt.logs[0].topics[1].slice(26).toLowerCase()}`, accounts[0].address.toLowerCase());
    assert.strictEqual(`0x${receipt.logs[0].topics[2].slice(26).toLowerCase()}`, accounts[1].address.toLowerCase());
    assert.strictEqual(parseInt(receipt.logs[0].data), 0);
  });

  it('events: should fire Approval event properly', async () => {
    const res = await HST.approve(accounts[1].address, '2666');
     const receipt = await provider.getTransactionReceipt(res.hash)
    assert.strictEqual(`0x${receipt.logs[0].topics[1].slice(26).toLowerCase()}`, accounts[0].address.toLowerCase());
    assert.strictEqual(`0x${receipt.logs[0].topics[2].slice(26).toLowerCase()}`, accounts[1].address.toLowerCase());
    assert.strictEqual(parseInt(receipt.logs[0].data), 2666);
  });
});
